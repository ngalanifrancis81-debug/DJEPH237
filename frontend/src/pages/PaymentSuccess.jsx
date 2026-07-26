import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, XCircle, Home as HomeIcon } from "lucide-react";
import { getPaymentStatus } from "@/lib/api";

const MAX_TRIES = 8;

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const isPaypal = params.get("paypal") === "1";
  const sessionId = params.get("session_id");
  const [state, setState] = useState(isPaypal ? "paid" : "checking");

  useEffect(() => {
    if (isPaypal) return;
    if (!sessionId) { setState("failed"); return; }
    let tries = 0, timer;
    const poll = async () => {
      try {
        const d = await getPaymentStatus(sessionId);
        if (d.payment_status === "paid") { setState("paid"); return; }
        if (["expired", "failed"].includes(d.payment_status)) { setState("failed"); return; }
      } catch (e) { /* retry */ }
      tries += 1;
      if (tries >= MAX_TRIES) { setState("failed"); return; }
      timer = setTimeout(poll, 2000);
    };
    poll();
    return () => clearTimeout(timer);
  }, [sessionId, isPaypal]);

  return (
    <main className="min-h-screen grid place-items-center bg-secondary px-6 pt-24 pb-16" data-testid="payment-success-page">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center rounded-[1.75rem] border border-ink/5 bg-white p-10 md:p-14 card-shadow">
        {state === "checking" && (<><Loader2 className="w-14 h-14 text-brand animate-spin mx-auto" /><p className="mt-6 text-lg text-ink/60" data-testid="payment-verifying">Vérification de votre paiement…</p></>)}
        {state === "paid" && (<>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}><CheckCircle2 className="w-16 h-16 text-[#25D366] mx-auto" /></motion.div>
          <h1 className="mt-6 font-display font-extrabold text-3xl text-ink" data-testid="payment-success-title">Merci infiniment !</h1>
          <p className="mt-4 text-ink/60 leading-relaxed">Votre paiement a bien été confirmé. Un reçu vous a été envoyé par e-mail. Notre équipe vous recontactera rapidement pour finaliser votre participation.</p>
        </>)}
        {state === "failed" && (<>
          <XCircle className="w-16 h-16 text-destructive mx-auto" />
          <h1 className="mt-6 font-display font-extrabold text-3xl text-ink" data-testid="payment-failed-title">Paiement non confirmé</h1>
          <p className="mt-4 text-ink/60 leading-relaxed">Nous n'avons pas pu confirmer votre paiement. Réessayez ou contactez-nous.</p>
        </>)}
        <Link to="/" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white px-7 py-3.5 font-bold transition-colors" data-testid="success-home-btn">
          <HomeIcon className="w-4 h-4" /> Retour à l'accueil
        </Link>
      </motion.div>
    </main>
  );
}
