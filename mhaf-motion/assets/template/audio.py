import numpy as np, wave, os
os.makedirs('out', exist_ok=True)
sr=44100; dur=72.2; n=int(sr*dur)
rng=np.random.default_rng(7)
out=np.zeros(n,dtype=np.float64)
def add(sig,t0,gain=1.0):
    i=int(t0*sr); j=min(n,i+len(sig))
    if i<n and j>i: out[i:j]+=sig[:j-i]*gain
def env(L,a,d):
    e=np.ones(L); A=int(a*sr); e[:A]=np.linspace(0,1,A); D=L-A; e[A:]=np.exp(-np.linspace(0,d,D)); return e
def pluck(f,L=0.5):
    t=np.arange(int(sr*L))/sr
    s=np.sin(2*np.pi*f*t)+0.4*np.sin(2*np.pi*2*f*t)+0.15*np.sin(2*np.pi*3*f*t)
    return s*env(len(t),0.004,7)
def bass(f,L=0.9):
    t=np.arange(int(sr*L))/sr
    return np.sin(2*np.pi*f*t)*env(len(t),0.01,4)
def kick(L=0.25):
    t=np.arange(int(sr*L))/sr
    f=45+110*np.exp(-t*28)
    return np.sin(2*np.pi*np.cumsum(f)/sr)*env(len(t),0.002,9)
def hat(L=0.06):
    x=rng.standard_normal(int(sr*L)); x=np.diff(x,prepend=0); return x*env(len(x),0.001,9)
def whoosh(L=0.55,up=True):
    x=rng.standard_normal(int(sr*L)); X=np.fft.rfft(x); fr=np.fft.rfftfreq(len(x),1/sr)
    out_=np.zeros(len(x)); B=24; bl=len(x)//B
    for b in range(B):
        c=(300+5500*(b/B)**2) if up else (5800-5400*(b/B)); 
        seg=x[b*bl:(b+1)*bl]; S=np.fft.rfft(seg); f=np.fft.rfftfreq(len(seg),1/sr)
        S*=np.exp(-((f-c)/ (c*0.6))**2); out_[b*bl:(b+1)*bl]=np.fft.irfft(S,len(seg))
    e=np.sin(np.linspace(0,np.pi,len(out_)))**1.5
    return out_*e/ (np.abs(out_).max()+1e-9)
bpm=108; beat=60/bpm
chords=[(110.0,[220,261.63,329.63]),(87.31,[174.61,220,261.63]),(130.81,[261.63,329.63,392]),(98.0,[196,246.94,293.66])]
bars=int(dur/(beat*4))+1
for b in range(bars):
    t0=b*beat*4
    if t0<0.0: continue
    root,tri=chords[b%4]
    mute=0.0 if t0<2.0 else 1.0
    add(bass(root/1.0),t0,0.28*mute); add(bass(root),t0+beat*2.5,0.18*mute)
    for k in range(8):
        add(pluck(tri[[0,1,2,1][k%4]]*(2 if k%2 else 1),0.45),t0+k*beat/2,0.075*(0.6 if t0<2 else 1))
    for k in range(4):
        add(kick(),t0+k*beat,0.22*mute)
        add(hat(),t0+k*beat+beat/2,0.05*mute)
# transitions + hits
cuts=[3,6,10.5,16.5,24.2,32.4,37.4,47.2,53.5,62.7,66.2,70.4]
for c in cuts: add(whoosh(0.5,up=True),c-0.4,0.20)
add(kick(0.4),0.05,0.5); add(kick(0.3),0.9,0.45)
# caption ticks (soft pops) at selected caption starts
for t in [0.5,3.15,4.55,10.9,13.2,15.1,17,18.6,20.9,26,28,32.8,34,35.5,39,41,43,45,48,50,56,58,60,62,64.5,68,70.5]:
    add(pluck(880 if int(t)%2 else 660,0.18),t,0.05)
# fade
fi=int(0.3*sr); out[:fi]*=np.linspace(0,1,fi)
fo=int(1.2*sr); out[-fo:]*=np.linspace(1,0,fo)
out/=np.abs(out).max(); out*=0.8
pcm=(out*32767).astype(np.int16)
with wave.open('out/music.wav','wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(pcm.tobytes())
print('ok')
