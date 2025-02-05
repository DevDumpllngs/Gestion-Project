import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { TbStars } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const preexistingAccount = {
  email: "test@g.com",
  password: "123",
};

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const MAX_PARTICLES = 50; // Limitamos el número máximo de partículas

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    let lastTime = 0;
    const createParticle = (e?: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < 100) return; // Throttling
      lastTime = currentTime;

      if (particles.length >= MAX_PARTICLES) {
        particles.splice(0, 1); // Eliminamos la partícula más antigua
      }

      const x = e ? e.clientX : Math.random() * canvas.width;
      const y = e ? e.clientY : Math.random() * canvas.height;
      
      particles.push({
        x,
        y,
        size: Math.random() * 2 + 1, // Reducimos el tamaño
        speedX: (Math.random() - 0.5) * 2, // Reducimos la velocidad
        speedY: (Math.random() - 0.5) * 2,
        color: `rgba(139, 92, 246, ${Math.random() * 0.3 + 0.2})` // Reducimos opacidad
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width || 
            particle.y < 0 || particle.y > canvas.height) {
          particles.splice(index, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      if (particles.length < MAX_PARTICLES && Math.random() > 0.95) {
        createParticle();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', createParticle);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', createParticle);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
};

const FloatingStars = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <TbStars
          key={i}
          className="absolute text-violet-500/30 animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  );
};

const AuthForm = ({ onLogin }: { onLogin: () => void }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const controls = useAnimation();
  const formRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    controls.start({
      rotateX,
      rotateY,
      transition: { type: "spring", stiffness: 200, damping: 10 }
    });
  };

  const handleMouseLeave = () => {
    controls.start({ rotateX: 0, rotateY: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    if (isLogin) {
      if (email === preexistingAccount.email && password === preexistingAccount.password) {
        handleSuccessfulLogin();
      } else {
        Swal.fire({
          title: "Invalid Credentials",
          text: "Please check your email and password.",
          icon: "error",
          confirmButtonColor: "#8b5cf6",
        });
      }
    } else {
      Swal.fire({
        title: "Account Created",
        text: "Your account has been created successfully.",
        icon: "success",
        confirmButtonColor: "#8b5cf6",
      });
    }
  };

  const handleSuccessfulLogin = () => {
    sessionStorage.setItem("isLoggedIn", "true");
    onLogin(); // Call onLogin to update authentication state
    Swal.fire({
      title: "Login Successful",
      text: "Redirecting to Dashboard",
      icon: "success",
      confirmButtonColor: "#8b5cf6",
    }).then(() => {
      navigate('/dashboard');
    });
  };

  return (
    <div className="h-full top-0 left-0 w-full flex items-center justify-center bg-black absolute overflow-hidden perspective-1000">
      <ParticleField />
      <FloatingStars />

      <motion.div
        ref={formRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} // Removed duplicate animate prop
        style={{ transformStyle: "preserve-3d" }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          className="bg-gray-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-violet-500/20 relative overflow-hidden"
          whileHover={{ boxShadow: "0 0 50px rgba(139, 92, 246, 0.3)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-shimmer" />
          </div>

          <motion.div
            initial={false}
            animate={{ height: 'auto' }}
            className="text-center mb-8 relative"
          >
            <motion.h2 
              className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {isLogin ? 'Welcome Back' : 'Join Us'}
            </motion.h2>
            <p className="text-gray-400 mt-4">
              {isLogin
                ? 'Enter your credentials to access your account'
                : 'Create your account and start your journey'}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode='wait'>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative group">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-violet-400 transition-colors" />
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-10 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition-all transform hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-violet-400 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-10 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition-all transform hover:scale-[1.01]"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>

            <div className="relative group">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-violet-400 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-10 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition-all transform hover:scale-[1.01]"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-violet-600 hover:bg-violet-700 rounded-xl py-4 text-white font-semibold relative overflow-hidden group"
              disabled={isLoading}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-500 to-violet-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ type: "tween" }}
              />
            </motion.button>
          </form>

          <motion.div 
            className="mt-8 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 hover:text-violet-400 transition-colors text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
