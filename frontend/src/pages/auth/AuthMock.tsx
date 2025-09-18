import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthMock() {
  const { provider } = useParams<{ provider: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  useEffect(() => {
    let t1 = setTimeout(() => setStep(1), 600);
    let t2 = setTimeout(() => setStep(2), 1400);
    let t3 = setTimeout(() => {
      // after mock success, navigate to profile/me
      navigate('/profile/me');
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigate]);

  const title = provider ? `Signing in with ${provider}` : 'Signing in';

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-bg">
      <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-surface p-8 rounded-lg shadow text-center">
        <h2 className="text-xl font-semibold text-primary mb-2">{title}</h2>
        <p className="text-muted mb-4">We are connecting your account. This is a safe mock flow for testing.</p>

        <div className="flex items-center justify-center gap-3">
          <div className={`w-3 h-3 rounded-full ${step > 0 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step > 1 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step > 2 ? 'bg-primary' : 'bg-muted'}`}></div>
        </div>

        <div className="mt-6 text-sm text-muted">You will be redirected shortly...</div>
      </motion.div>
    </div>
  );
}
