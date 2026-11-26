import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArcCrossLogo } from '../../components/common/ArcCrossLogo';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowRight, Laptop, Smartphone, Tablet, Radio } from 'lucide-react';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentDevice, updateDeviceName } = useApp();
  const [deviceName, setDeviceName] = useState(currentDevice.name);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (deviceName.trim()) {
      updateDeviceName(currentDevice.id, deviceName.trim());
    }
    navigate('/app');
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '75vh',
        maxWidth: '560px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      {/* Brand Emblem */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <ArcCrossLogo size={42} showText={false} />
      </div>

      {/* Main Headline */}
      <h1
        style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          letterSpacing: '-0.025em',
          color: 'var(--color-text-primary)',
          lineHeight: 1.25,
          marginBottom: 'var(--space-2)',
        }}
      >
        Your devices. Directly connected.
      </h1>

      <p
        style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          maxWidth: '460px',
          marginBottom: 'var(--space-6)',
        }}
      >
        One seamless space for your hardware. Pair, transmit, and manage files with native performance and a zero-cloud architecture.
      </p>

      {/* macOS Setup Assistant Orbital Graphic Card */}
      <div
        className="macos-inset-group"
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '160px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-6)',
          overflow: 'hidden',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        {/* Trajectory */}
        <div
          style={{
            position: 'absolute',
            width: '280px',
            height: '90px',
            borderRadius: '50%',
            border: '1px dashed var(--color-border)',
            pointerEvents: 'none',
          }}
        />

        {/* Central Host */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 2 }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-elevated)',
              border: '2px solid var(--color-teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-teal)',
              boxShadow: '0 2px 8px rgba(42, 140, 131, 0.2)',
            }}
          >
            <Laptop size={22} />
          </div>
          <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            MacBook Pro
          </span>
        </div>

        {/* Satellite 1: Mobile */}
        <div style={{ position: 'absolute', left: '36px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 2 }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-elevated)',
              border: '1.5px solid var(--color-deep-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-deep-blue)',
            }}
          >
            <Smartphone size={16} />
          </div>
          <span style={{ fontSize: '0.5625rem', color: 'var(--color-text-tertiary)' }}>Pixel 9</span>
        </div>

        {/* Satellite 2: Tablet */}
        <div style={{ position: 'absolute', right: '36px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 2 }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-elevated)',
              border: '1.5px solid var(--color-deep-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-deep-blue)',
            }}
          >
            <Tablet size={16} />
          </div>
          <span style={{ fontSize: '0.5625rem', color: 'var(--color-text-tertiary)' }}>iPad Pro</span>
        </div>

        <div
          className="animate-pulse-subtle"
          style={{
            position: 'absolute',
            top: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.625rem',
            color: 'var(--color-teal)',
            fontWeight: 500,
          }}
        >
          <Radio size={11} />
          <span>Point-to-Point Bonjour Discovery</span>
        </div>
      </div>

      {/* Setup Form */}
      <form
        onSubmit={handleContinue}
        style={{
          width: '100%',
          maxWidth: '380px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-4)',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <label
            htmlFor="welcome-name-input"
            style={{
              display: 'block',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: '5px',
            }}
          >
            Device Name on Subnet
          </label>
          <input
            id="welcome-name-input"
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            required
            style={{
              width: '100%',
              height: '34px',
              padding: '0 12px',
              borderRadius: 'var(--radius-control)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
              fontSize: 'var(--text-sm)',
              outline: 'none',
            }}
          />
        </div>

        <button
          type="submit"
          className="macos-button primary"
          style={{ width: '100%', height: '34px' }}
        >
          <span>Continue to Ecosystem</span>
          <ArrowRight size={14} />
        </button>
      </form>

      {/* Privacy Pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-elevated)',
          border: '1px solid var(--color-border)',
          fontSize: 'var(--text-2xs)',
          color: 'var(--color-text-secondary)',
        }}
      >
        <ShieldCheck size={13} color="var(--color-teal)" />
        <span>Local subnet isolation. Zero accounts, cloud storage, or external tracking.</span>
      </div>
    </div>
  );
};
