import { useState } from "react";
import { BadgeCheck, Check, Copy, Printer, ShieldCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Badge, Modal } from "../components/UI";
import { useApp } from "../context/AppContext";

const certificateIdFor = (username) => `CF-${String(username || "USER").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8)}-2026-001`;

function certificateFor(profile, certificateId = certificateIdFor(profile.username)) {
  return { id: certificateId, name: profile.username, username: `@${profile.username}`, title: "CodeForge Problem Solving Certificate", achievement: `For solving ${profile.solved} coding problems and demonstrating consistent algorithmic problem-solving skills.`, date: "September 17, 2026", verified: true };
}

export function CertificatePage() {
  const { profile } = useApp();
  const [preview, setPreview] = useState(false);
  const certificate = certificateFor(profile);
  const verifyUrl = `${window.location.origin}/verify/${certificate.id}`;
  const copyUrl = async () => { await navigator.clipboard?.writeText(verifyUrl); };
  return (
    <div className="page certificate-page">
      <div className="certificate-intro"><div><p className="eyebrow">Achievement center</p><h1>Certificates</h1><p>Celebrate your progress with a verified CodeForge certificate.</p></div><Badge tone="good"><BadgeCheck size={15} /> Verified achievement</Badge></div>
      <section className="certificate-card-wrap">
        <CertificateArtwork certificate={certificate} compact />
        <div className="certificate-actions"><button className="primary" onClick={() => setPreview(true)}><BadgeCheck size={17} /> Preview certificate</button><button onClick={copyUrl}><Copy size={17} /> Copy verify URL</button></div>
      </section>
      {preview && <Modal title="Certificate preview" onClose={() => setPreview(false)}><CertificateArtwork certificate={certificate} /><div className="modal-actions"><button onClick={() => window.print()}><Printer size={17} /> Print / Save PDF</button><button className="primary" onClick={copyUrl}><Copy size={17} /> Copy verify URL</button></div></Modal>}
    </div>
  );
}

function CertificateArtwork({ certificate, compact = false }) {
  return <article className={`certificate-artwork ${compact ? "compact" : ""}`}><div className="certificate-inner"><div className="certificate-mark"><ShieldCheck size={compact ? 28 : 38} /><span>CODEFORGE</span></div><p className="certificate-kicker">CERTIFICATE OF ACHIEVEMENT</p><h2>{certificate.title}</h2><p className="certificate-copy">This certificate is proudly presented to</p><p className="certificate-name">{certificate.name}</p><p className="certificate-username">{certificate.username}</p><p className="certificate-achievement">{certificate.achievement}</p><div className="certificate-meta"><span><small>Certificate ID</small><strong>{certificate.id}</strong></span><span><small>Issue date</small><strong>{certificate.date}</strong></span><span className="verified-stamp"><Check size={16} /> Verified</span></div></div></article>;
}

export function VerifyCertificatePage() {
  const { certificateId } = useParams();
  const { profile } = useApp();
  const verified = certificateId === certificateIdFor(profile.username);
  const certificate = certificateFor(profile, certificateId);
  return <main className="verify-page"><div className="verify-shell"><div className="certificate-mark"><ShieldCheck size={30} /><span>CODEFORGE</span></div>{verified ? <><Badge tone="good"><Check size={14} /> Verified certificate</Badge><h1>Certificate verified</h1><p>This achievement is authentic and was issued by CodeForge.</p><CertificateArtwork certificate={certificate} compact /></> : <><Badge tone="bad">Certificate not found</Badge><h1>Certificate could not be verified</h1><p>The certificate ID is invalid or no longer available.</p></>}<Link className="primary verify-back" to="/login">Open CodeForge</Link></div></main>;
}