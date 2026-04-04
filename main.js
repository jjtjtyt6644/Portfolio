import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


const lenis = new Lenis({
  duration: 1.6,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
})
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add(time => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0, 0)


const dot = document.querySelector('.cursor')
const follower = document.querySelector('.cursor-follower')
const isTouch = !window.matchMedia('(pointer: fine)').matches

if (isTouch) {
  dot.style.display = follower.style.display = 'none'
} else {
  let mx = 0, my = 0, fx = 0, fy = 0

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY })

  gsap.ticker.add(() => {
    gsap.set(dot, { x: mx, y: my })
    fx += (mx - fx) * 0.12
    fy += (my - fy) * 0.12
    gsap.set(follower, { x: fx, y: fy })
  })

  const expandTargets = 'a, button, .discipline-card, .cert-card, .build-card'
  document.querySelectorAll(expandTargets).forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovered'))
    el.addEventListener('mouseleave', () => follower.classList.remove('hovered'))
  })
}


const navbar = document.querySelector('.navbar')
lenis.on('scroll', ({ scroll }) => {
  navbar.classList.toggle('scrolled', scroll > 60)
})


gsap.timeline({ defaults: { ease: 'expo.out' } })
  .from('.hero-badge', { y: -30, opacity: 0, duration: 1.2, delay: 0.2 })
  .from('.hero .line', { y: '110%', rotationZ: 3, opacity: 0, duration: 1.6, stagger: 0.12 }, '-=0.8')
  .from('.hero-sub', { opacity: 0, letterSpacing: '10px', duration: 1.2 }, '-=0.8')
  .to('.hero-scroll', { opacity: 1, duration: 0.6 }, '-=0.4')
  .to('.scroll-line', { scaleX: 1, duration: 0.8, ease: 'power3.out' }, '<')


gsap.from('.about .eyebrow', {
  opacity: 0, y: 20, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '.about', start: 'top 80%' }
})


document.querySelectorAll('.stat-num').forEach(el => {
  const target = parseInt(el.dataset.target, 10)
  gsap.fromTo(el,
    { textContent: 0 },
    {
      textContent: target, duration: 2, ease: 'power2.out',
      snap: { textContent: 1 },
      scrollTrigger: { trigger: el, start: 'top 88%' }
    }
  )
})

gsap.from('.stat-item', {
  x: -30, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out',
  scrollTrigger: { trigger: '.about-stat-stack', start: 'top 85%' }
})

gsap.utils.toArray('.discipline-card').forEach((card, i) => {
  gsap.to(card, {
    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 85%'
    }
  })
})

gsap.to('.tech-pill', {
  opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)',
  scrollTrigger: { trigger: '.tech-stack', start: 'top 85%' }
})


gsap.from('.certs-section .eyebrow', {
  opacity: 0, y: 20, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '.certs-section', start: 'top 80%' }
})

gsap.from('.certs-heading .line', {
  y: '110%', duration: 1.4, ease: 'expo.out',
  scrollTrigger: { trigger: '.certs-heading', start: 'top 85%' }
})

gsap.from('.certs-sub', {
  opacity: 0, y: 20, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '.certs-sub', start: 'top 90%' }
})

gsap.to('.cert-card', {
  opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'back.out(1.3)',
  scrollTrigger: { trigger: '.certs-grid', start: 'top 82%' }
})


const cards = gsap.utils.toArray('.build-card')


gsap.set(cards, { autoAlpha: 0 })

const masterTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.builds-section',
    start: 'top top',
    end: () => `+=${window.innerHeight * 5}`,
    pin: true,
    scrub: 1,
  }
})

cards.forEach((card, i) => {
  const imgWrap = card.querySelector('.build-image-wrapper')
  const img = card.querySelector('img')
  const titles = card.querySelectorAll('h3')
  const meta = card.querySelector('.info-meta')

  /* ── IN ── */
  const inTl = gsap.timeline()


  inTl.set(card, { autoAlpha: 1 })

  if (i === 0) {

    inTl.fromTo(imgWrap,
      { clipPath: 'inset(100% 0% 0% 0%)', y: 40 },
      { clipPath: 'inset(0%   0% 0% 0%)', y: 0, duration: 1, ease: 'expo.inOut' }
    )
    inTl.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 1.1, ease: 'expo.out' }, '<')
    inTl.fromTo(titles,
      { y: '115%', rotation: 4 },
      { y: '0%', rotation: 0, duration: 1, stagger: 0.1, ease: 'expo.out' }, '-=0.6')

  } else if (i === 1) {

    inTl.fromTo(imgWrap,
      { x: '55%', opacity: 0, scale: 0.88 },
      { x: '0%', opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out' }
    )
    inTl.fromTo(titles,
      { y: '-115%', skewY: -5 },
      { y: '0%', skewY: 0, duration: 1.1, stagger: 0.1, ease: 'back.out(1.3)' }, '-=0.8')

  } else {

    inTl.fromTo(imgWrap,
      { rotationX: -65, scale: 0.75, opacity: 0, transformPerspective: 1200 },
      { rotationX: 0, scale: 1, opacity: 1, duration: 1.3, ease: 'elastic.out(1, 0.65)' }
    )
    inTl.fromTo(titles,
      { opacity: 0, y: 55, filter: 'blur(12px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1, ease: 'power3.out' }, '-=0.7')
  }


  inTl.fromTo(meta,
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4'
  )

  masterTl.add(inTl)
  masterTl.to({}, { duration: 0.9 })

  /* ── OUT ── */
  if (i < cards.length - 1) {
    const outTl = gsap.timeline()

    if (i === 0) {
      outTl.to(imgWrap, { y: -70, opacity: 0, duration: 0.8, ease: 'power3.in' })
      outTl.to(titles, { y: '-130%', duration: 0.6, stagger: 0.06, ease: 'power3.in' }, '<')
      outTl.to(meta, { opacity: 0, duration: 0.3 }, '<')
    } else if (i === 1) {
      outTl.to(imgWrap, { x: '-55%', scale: 0.6, opacity: 0, duration: 0.8, ease: 'expo.in' })
      outTl.to(titles, { opacity: 0, x: -35, duration: 0.5, stagger: 0.06, ease: 'expo.in' }, '<')
      outTl.to(meta, { opacity: 0, duration: 0.3 }, '<')
    } else if (i === 2) {
      outTl.to(imgWrap, { rotationX: 45, opacity: 0, scale: 0.8, duration: 0.8, ease: 'power2.in' })
      outTl.to(titles, { opacity: 0, y: -45, filter: 'blur(10px)', duration: 0.6, stagger: 0.06, ease: 'power2.in' }, '<')
      outTl.to(meta, { opacity: 0, duration: 0.3 }, '<')
    }


    outTl.set(card, { autoAlpha: 0 })
    masterTl.add(outTl)
  }
})


gsap.timeline({ scrollTrigger: { trigger: '.contact', start: 'top 75%' } })
  .from('.contact-eyebrow', { opacity: 0, y: 20, duration: 0.8 })
  .from('.contact .line', { y: '110%', duration: 1.4, stagger: 0.1, ease: 'expo.out' }, '-=0.4')
  .from('.contact-sub', { opacity: 0, y: 20, duration: 1, ease: 'power3.out' }, '-=0.8')
  .from('.contact-links a', { opacity: 0, y: 30, stagger: 0.15, duration: 0.9, ease: 'power3.out' }, '-=0.6')


if (!isTouch) {
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect()
      gsap.to(btn, {
        x: (e.clientX - r.left - r.width / 2) * 0.35,
        y: (e.clientY - r.top - r.height / 2) * 0.35,
        duration: 0.5, ease: 'power3.out'
      })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
    })
  })
}


const overlay = document.getElementById('modal-overlay')
const modalClose = document.getElementById('modal-close')
const modalImg = document.getElementById('modal-img')
const modalTitle = document.getElementById('modal-title')
const modalDesc = document.getElementById('modal-desc')
const modalTags = document.getElementById('modal-tags')
const modalLink = document.getElementById('modal-link')

function openModal(card) {
  const title = card.dataset.title
  const desc = card.dataset.desc

  const imgElement = card.querySelector('.build-image-wrapper img')
  const img = imgElement ? imgElement.src : card.dataset.img
  const github = card.dataset.github
  const tags = (card.dataset.tags || '').split(',').map(t => t.trim()).filter(Boolean)

  modalImg.src = img
  modalImg.alt = title
  modalTitle.textContent = title
  modalDesc.textContent = desc
  modalLink.href = github

  modalTags.innerHTML = tags.map(t => `<span>${t}</span>`).join('')

  overlay.classList.add('open')
  document.body.style.overflow = 'hidden'
  lenis.stop()
}

function closeModal() {
  overlay.classList.remove('open')
  document.body.style.overflow = ''
  lenis.start()
}


document.querySelectorAll('.open-modal-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation()
    const card = btn.closest('.build-card')
    if (card) openModal(card)
  })
})


modalClose.addEventListener('click', closeModal)


overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal()
})


document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal()
})

/*
   MASCOT – AI Dynamic Speech Bubble */
const mascotChar = document.getElementById('mascot-char')
const mascotBubble = document.getElementById('mascot-bubble')
const bubbleText = document.getElementById('bubble-text')
const bubbleClose = document.getElementById('bubble-close')


let activeSection = ''
let typingTimer = null
let lastSectionSwap = 0
const COOLDOWN_MS = 1500


const CACHED_RESPONSES = {}


const SECTION_CONTEXT = {
  hero: "Junyu's Hero Section: A high schooler from Singapore passionate about Cybersecurity, AI, and Networking. Mission is breaking things legally.",
  about: "Junyu's About Section: 18+ GitHub repos. 2 IBM certifications. Specializes in Security, Networking, and rapid development.",
  certs: "Junyu's Certifications: IBM AI Certified and IBM Cyber Security Certified while still in high school.",
  builds: "Junyu's Projects: 1. CyberAttacks-Simulation (vulnerable site with SOC dashboard). 2. FocusMode (Chrome productivity extension). 3. Ai-Vision (AI browser assistant). 4. Proxyyy (a proxy server for traffic routing & security).",
  experience: "Junyu's Experience: Timeline showing a cyber security student background, and an IBM Certified AI builder status.",
  contact: "Junyu's Contact Page: Email yaoprox0@gmail.com. Open to security chats and collaboration."
}


async function fetchElaboration(sectionId) {

  if (CACHED_RESPONSES[sectionId]) {
    return CACHED_RESPONSES[sectionId]
  }

  const cleanContext = SECTION_CONTEXT[sectionId] || "Junyu's Portfolio space.";

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: cleanContext })
    })

    const data = await response.json()
    if (data.choices && data.choices.length > 0) {
      const result = data.choices[0].message.content.trim()
      CACHED_RESPONSES[sectionId] = resul
      return result
    }
    return "The server encountered an error while processing context."
  } catch (err) {
    console.error('API Error:', err)
    return "The secure AI bridge is currently offline."
  }
}


function typeText(text) {
  clearInterval(typingTimer)
  bubbleText.classList.remove('typing')
  bubbleText.textContent = ''

  const chars = Array.from(text)
  let i = 0

  bubbleText.classList.add('typing')
  typingTimer = setInterval(() => {
    if (i < chars.length) {
      bubbleText.textContent += chars[i]
      i++
    } else {
      clearInterval(typingTimer)
      typingTimer = null
      bubbleText.classList.remove('typing')
    }
  }, 38)
}


async function switchSection(section) {
  const now = Date.now()


  if (section === activeSection || now - lastSectionSwap < COOLDOWN_MS) return

  activeSection = section
  lastSectionSwap = now


  typeText("Processing context...")


  gsap.fromTo(mascotChar,
    { y: -16 },
    { y: 0, duration: 0.8, ease: 'elastic.out(1, 0.45)' }
  )


  const message = await fetchElaboration(section)


  if (activeSection === section) {
    typeText(message)
  }
}


const TRACKED = ['hero', 'about', 'certs', 'builds', 'experience', 'contact']

function getNearestSection() {

  const midX = window.innerWidth / 2;
  const midY = window.innerHeight / 2;
  const elements = document.elementsFromPoint(midX, midY);

  if (!elements) return null;

  for (let el of elements) {
    const section = el.closest('section');
    if (section && TRACKED.includes(section.id)) {
      return section.id;
    }
  }
  return null;
}

let scrollStopTimer = null

lenis.on('scroll', () => {
  clearTimeout(scrollStopTimer)
  scrollStopTimer = setTimeout(() => {
    const section = getNearestSection()
    if (section) switchSection(section)
  }, 750)
})


const clickTimestamps = [];
const MAX_CLICKS = 5;
const BLOCK_DURATION_MS = 2 * 60 * 1000;
let isRateLimited = false;

const rateLimitOverlay = document.getElementById('rate-limit-overlay');
document.getElementById('rate-limit-close').addEventListener('click', () => {
  rateLimitOverlay.classList.remove('open');
});


const chatMsgTimestamps = [];
const CHAT_MAX_MESSAGES = 10;
const CHAT_WARNING_THRESHOLD = 6;
let isChatLimited = false;

const chatLimitOverlay = document.getElementById('chat-limit-overlay');
const chatLimitModal = document.getElementById('chat-limit-modal');
const chatLimitTitle = document.getElementById('chat-limit-title');
const chatLimitDesc = document.getElementById('chat-limit-desc');
const chatLimitClose = document.getElementById('chat-limit-close');

chatLimitClose.addEventListener('click', () => {
  chatLimitOverlay.classList.remove('open');
});


mascotChar.addEventListener('click', async () => {
  if (isRateLimited) {
    rateLimitOverlay.classList.add('open');
    return;
  }

  const now = Date.now();

  while (clickTimestamps.length > 0 && clickTimestamps[0] < now - BLOCK_DURATION_MS) {
    clickTimestamps.shift();
  }

  clickTimestamps.push(now);

  if (clickTimestamps.length > MAX_CLICKS) {
    isRateLimited = true;
    rateLimitOverlay.classList.add('open');
    

    setTimeout(() => {
      isRateLimited = false;
      clickTimestamps.length = 0;
    }, BLOCK_DURATION_MS);
    return;
  }


  CACHED_RESPONSES[activeSection] = null;


  gsap.timeline()
    .to(mascotChar, { scale: 0.85, rotation: -15, duration: 0.2 })
    .to(mascotChar, { scale: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' });

  typeText("Analyzing current view...");

  const message = await fetchElaboration(activeSection || 'hero');
  typeText(message);
});


bubbleClose.addEventListener('click', () => {
  mascotBubble.classList.remove('visible')
  clearInterval(typingTimer)
})


mascotChar.addEventListener('dblclick', () => {
  if (mascotBubble.classList.contains('visible')) {
    mascotBubble.classList.remove('visible')
    clearInterval(typingTimer)
  } else {
    mascotBubble.classList.add('visible')
    lastSectionSwap = 0
    switchSection(activeSection || 'hero')
  }
})


setTimeout(() => {
  mascotBubble.classList.add('visible')
  activeSection = ''
  lastSectionSwap = 0


  CACHED_RESPONSES['hero'] = "Hello. I am Junyu's AI assistant. Scroll down, and I will provide real-time context on his work.";
  switchSection('hero')
}, 2400)


const chatToggleBtn = document.getElementById('chat-toggle-btn')
const aiChatWindow = document.getElementById('ai-chat-window')
const aiChatClose = document.getElementById('ai-chat-close')
const aiChatMessages = document.getElementById('ai-chat-messages')
const aiChatInput = document.getElementById('ai-chat-input')
const aiChatSend = document.getElementById('ai-chat-send')

let conversationHistory = []


chatToggleBtn.addEventListener('click', () => {
  aiChatWindow.classList.add('open')
  aiChatInput.focus()
})

aiChatClose.addEventListener('click', () => {
  aiChatWindow.classList.remove('open')
})

function appendMessage(role, text) {
  const div = document.createElement('div')
  div.className = `chat-message ${role === 'user' ? 'user-message' : 'ai-message'}`
  

  let formattedText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');

  div.innerHTML = formattedText
  aiChatMessages.appendChild(div)
  


  setTimeout(() => {
    if (role === 'ai') {
      const offset = div.offsetTop - 15;
      aiChatMessages.scrollTo({ top: offset, behavior: 'smooth' });
    } else {
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight
    }
  }, 10)
}

async function handleChatSubmit() {
  const text = aiChatInput.value.trim()
  if (!text) return


  if (text.toLowerCase() === 'flag{h1r3_m3_plz}') {
    appendMessage('user', text)
    aiChatInput.value = ''
    
    setTimeout(() => {
      const specialDiv = document.createElement('div')
      specialDiv.className = 'chat-message ai-message'
      specialDiv.style.color = '#4ade80'
      specialDiv.style.fontFamily = 'monospace'
      specialDiv.innerHTML = "ACCESS GRANTED.<br/><br/>System override complete.<br/>Welcome, administrator. Enjoy navigating the network."
      aiChatMessages.appendChild(specialDiv)
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight
    }, 600)
    return
  }


  if (isChatLimited) {
    chatLimitOverlay.classList.add('open');
    return;
  }

  const now = Date.now();

  while (chatMsgTimestamps.length > 0 && chatMsgTimestamps[0] < now - BLOCK_DURATION_MS) {
    chatMsgTimestamps.shift();
  }

  chatMsgTimestamps.push(now);
  const msgCount = chatMsgTimestamps.length;


  if (msgCount >= CHAT_MAX_MESSAGES) {
    isChatLimited = true;
    chatLimitTitle.textContent = "Rate Limit Exceeded";
    chatLimitDesc.textContent = "You have been locked out of the chat for 2 minutes due to excessive messaging.";
    chatLimitModal.className = "chat-limit-modal state-blocked";
    chatLimitOverlay.classList.add('open');

    setTimeout(() => {
      isChatLimited = false;
      chatMsgTimestamps.length = 0;
    }, BLOCK_DURATION_MS);
    return;
  }


  if (msgCount >= CHAT_WARNING_THRESHOLD) {
    chatLimitTitle.textContent = "Nearing Limit";
    chatLimitDesc.textContent = `Warning: You are approaching the message limit (${msgCount}/${CHAT_MAX_MESSAGES}). Please slow down.`;
    chatLimitModal.className = "chat-limit-modal state-warning";
    chatLimitOverlay.classList.add('open');
  }


  appendMessage('user', text)
  conversationHistory.push({ role: 'user', content: text })
  aiChatInput.value = ''


  const loadingDiv = document.createElement('div')
  loadingDiv.className = 'chat-message ai-message'
  loadingDiv.textContent = 'Thinking...'
  aiChatMessages.appendChild(loadingDiv)
  aiChatMessages.scrollTop = aiChatMessages.scrollHeight


  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
  let responseText = "Connection failed."

  try {
    if (isLocal) {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY
      if (!apiKey) throw new Error("Local API key missing.")

      const truncatedHistory = conversationHistory.slice(-8);
      const payloadMessages = [
        { role: 'system', content: `You are the official Professional AI Scout and Recruitment Representative for Junyu (@jjtjtyt6644). Your objective is to provide high-level, technical, and professional insights to CEOs, CTOs, and recruiters visiting this portfolio. Core Identity of Junyu: Independent Cybersecurity Professional and Full-Stack Developer. IBM Certified: Professional AI and Professional Cyber Security. GitHub Identity: jjtjtyt6644 (over 17 active repositories). Professional Protocols: Tone: Extremely polished, analytical, and recruitment-ready. Perspective: ALWAYS speak about Junyu in the THIRD PERSON. NEVER address the user as Junyu. Target Audience: High-level decision-makers and recruiters. Guardrails: Do NOT hallucinate. If asked about something you do not know, state: "I have no relevant information on that specific topic at this time. However, you can contact Junyu directly via GitHub: https://github.com/jjtjtyt6644"` },
        ...truncatedHistory
      ]

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: payloadMessages, max_tokens: 512, temperature: 0.5 })
      })
      const data = await res.json()
      responseText = data.choices[0].message.content.trim()
    } else {

      const res = await fetch('/api/converse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: conversationHistory.slice(-8) })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      responseText = data.choices[0].message.content.trim()
    }
  } catch (err) {
    console.error("Chat Error:", err)
    responseText = "Sorry, my neural link is currently offline."
  }


  loadingDiv.remove()
  appendMessage('ai', responseText)
  conversationHistory.push({ role: 'assistant', content: responseText })
}


aiChatSend.addEventListener('click', handleChatSubmit)
aiChatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleChatSubmit()
})


let firstOpen = true;
chatToggleBtn.addEventListener('click', () => {
  if (firstOpen) {
    appendMessage('ai', "Hello! I am Junyu's AI guide. I'm here to provide professional context or answer questions about his background, projects, and work-workflow. What can I help you with today?");
    firstOpen = false;
  }
});

/* ═══════════════════════════════════════════════════════════════
   DECODE TEXT EFFECT
═══════════════════════════════════════════════════════════════ */
function decodeText(element) {
  const originalText = element.textContent;
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  let iterations = 0;
  
  const interval = setInterval(() => {
    element.textContent = originalText.split('').map((letter, index) => {
      if(index < iterations) {
        return originalText[index];
      }
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    
    if(iterations >= originalText.length) {
      clearInterval(interval);
      element.textContent = originalText;
    }
    iterations += 1/3;
  }, 30);
}

gsap.utils.toArray('.decode-text').forEach(el => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: () => decodeText(el),
    once: true
  });
});

/* ═══════════════════════════════════════════════════════════════
   TERMINAL EXPERIENCE EFFECT
═══════════════════════════════════════════════════════════════ */
gsap.to('.terminal-window', {
  opacity: 1, y: 0, duration: 1, ease: 'power3.out',
  scrollTrigger: {
    trigger: '.terminal-section',
    start: 'top 75%',
    onEnter: () => startTerminalAnimation(),
    once: true
  }
});

let terminalStarted = false;
function startTerminalAnimation() {
  if(terminalStarted) return;
  terminalStarted = true;
  const termBody = document.getElementById('terminal-body');
  if(!termBody) return;
  
  const commands = [
    { text: "nmap localhost -p 22,80,443", type: "cmd", delay: 500 },
    { text: "Starting Nmap 7.94 ( https://nmap.org ) at 2024", type: "out", delay: 1000 },
    { text: "Port 22/tcp open ssh", type: "out", delay: 1500 },
    { text: "Port 80/tcp open http", type: "out", delay: 1700 },
    { text: "Port 443/tcp open https", type: "out", delay: 1900 },
    { text: "cat experience.timeline", type: "cmd", delay: 2800 },
    { text: "[2021-2024] High School - Cyber Security Focus", type: "out", delay: 3600 },
    { text: "[2024] IBM Certified AI Builder", type: "out", delay: 4000 },
    { text: "[2024] Independent Security Researcher", type: "out", delay: 4400 },
    { text: "Status: Ready for new challenges.", type: "out", delay: 4800 }
  ];

  const cursor = document.createElement('span');
  cursor.className = 'term-cursor';
  termBody.appendChild(cursor);

  commands.forEach((cmd) => {
    setTimeout(() => {
      cursor.remove();
      const line = document.createElement('span');
      line.className = cmd.type === 'cmd' ? 'term-line term-command' : 'term-line';
      if(cmd.type === 'cmd') {
        line.innerHTML = `root@junyu:~$ `;
        termBody.appendChild(line);
        let i = 0;
        let typeInt = setInterval(() => {
          line.innerHTML += cmd.text.charAt(i);
          i++;
          if(i >= cmd.text.length) {
            clearInterval(typeInt);
            termBody.appendChild(cursor);
            termBody.scrollTop = termBody.scrollHeight;
          }
        }, 40);
        line.style.opacity = 1;
      } else {
        line.innerHTML = cmd.text;
        termBody.appendChild(line);
        termBody.appendChild(cursor);
        gsap.fromTo(line, {opacity: 0, x: -10}, {opacity: 1, x: 0, duration: 0.3});
        termBody.scrollTop = termBody.scrollHeight;
      }
    }, cmd.delay);
  });
  

  setTimeout(() => setupInteractiveTerminal(termBody, cursor), 6000);
}

function setupInteractiveTerminal(termBody, cursor) {
  if (cursor && cursor.parentNode) cursor.remove();
  
  const promptWrapper = document.createElement('div');
  promptWrapper.className = 'term-line';
  promptWrapper.style.opacity = 1;
  promptWrapper.style.display = 'flex';
  
  const promptLabel = document.createElement('span');
  promptLabel.className = 'term-command';
  promptLabel.textContent = 'root@junyu:~$ ';
  promptLabel.style.marginRight = '8px';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'term-input';
  input.autocomplete = 'off';
  input.spellcheck = false;
  
  promptWrapper.appendChild(promptLabel);
  promptWrapper.appendChild(input);
  termBody.appendChild(promptWrapper);
  
  termBody.scrollTop = termBody.scrollHeight;
  

  termBody.addEventListener('click', () => input.focus());

  input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
      const val = input.value.trim();
      input.value = '';
      
      const echo = document.createElement('div');
      echo.className = 'term-line';
      echo.style.opacity = 1;
      echo.innerHTML = `<span class="term-command">root@junyu:~$</span> <span style="color:#eef2ff">${val}</span>`;
      promptWrapper.before(echo);
      
      if(val !== '') {
        const out = document.createElement('div');
        out.className = 'term-line';
        out.style.opacity = 1;
        const lowerVal = val.toLowerCase();
        
        if(lowerVal === 'help') {
           out.innerHTML = `Available commands:<br/> - whoami<br/> - clear<br/> - skills<br/> - contact<br/> - ./run_next_module.sh<br/> - date<br/> - echo<br/> - sudo`;
        } else if (lowerVal === 'whoami') {
           out.innerHTML = `junyu - Cyber Security & Networking Enthusiast`;
        } else if (lowerVal === 'clear') {
           termBody.innerHTML = '';
        } else if (lowerVal === 'skills') {
           out.innerHTML = `HTML, CSS, JS, Python, SQL, Bash. Specialty: PenTesting & Custom Proxies.`;
        } else if (lowerVal === 'contact') {
           out.innerHTML = `yaoprox0@gmail.com | github.com/jjtjtyt6644`;
        } else if (lowerVal === 'sudo') {
           out.innerHTML = `nice try. this incident will be reported.`;
        } else if (lowerVal === 'ls') {
           out.innerHTML = `experience.timeline  run_next_module.sh  secrets/`;
        } else if (lowerVal === './run_next_module.sh' || lowerVal === 'sh run_next_module.sh') {
           out.innerHTML = `[OK] Initiating module...<br/>[OK] Bypassing mainframe...<br/>[OK] Payload injected successfully.<br/><span style="color:#a78bfa; font-weight:bold;">Welcome to the next level.</span>`;
        } else if (lowerVal === 'date') {
           out.innerHTML = new Date().toString();
        } else if (lowerVal.startsWith('echo ')) {
           out.innerHTML = val.substring(5).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        } else if (lowerVal === 'cd secrets' || lowerVal === 'cd secrets/') {
           out.innerHTML = `bash: cd: secrets/: Permission denied`;
        } else if (lowerVal === 'matrix') {
           termBody.innerHTML = '<canvas id="matrix-canvas"></canvas>';
           startMatrixRain('matrix-canvas', termBody);

           return;
        } else {
           out.innerHTML = `bash: ${val}: command not found`;
        }
        
        if (lowerVal !== 'clear') {
          promptWrapper.before(out);
        } else {

          termBody.appendChild(promptWrapper);
        }
      }
      
      termBody.scrollTop = termBody.scrollHeight;
      input.focus();
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   NODE NETWORK BACKGROUND
═══════════════════════════════════════════════════════════════ */
const canvas = document.getElementById('network-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 100);

  class Particle {
    constructor() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * 800;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.fillStyle = 'rgba(125, 211, 252, 0.5)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for(let i=0; i<60; i++) particles.push(new Particle());

  let mouse = { x: null, y: null };
  const contactSection = document.getElementById('contact');
  if(contactSection) {
    contactSection.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    contactSection.addEventListener('mouseleave', () => {
      mouse.x = null; mouse.y = null;
    });
  }

  function animateNetwork() {
    if (!width) return requestAnimationFrame(animateNetwork);
    ctx.clearRect(0, 0, width, height);
    
    for(let i=0; i<particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      for(let j=i; j<particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(125, 211, 252, ${0.4 * (1 - dist/100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
      
      if (mouse.x != null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(125, 211, 252, ${0.8 * (1 - dist/150)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateNetwork);
  }
  animateNetwork();
}

/* ═══════════════════════════════════════════════════════════════
   DECRYPT CONTACT EMAIL
═══════════════════════════════════════════════════════════════ */
const emailBtn = document.getElementById('btn-email');
if (emailBtn) {
  emailBtn.addEventListener('click', (e) => {
    if(!emailBtn.classList.contains('decrypted')) {
      e.preventDefault();
      const realEmail = emailBtn.getAttribute('data-email');
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
      let iterations = 0;
      const interval = setInterval(() => {
        emailBtn.textContent = realEmail.split('').map((letter, index) => {
          if(index < iterations) return realEmail[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        if(iterations >= realEmail.length) {
          clearInterval(interval);
          emailBtn.classList.add('decrypted');
          emailBtn.href = `mailto:${realEmail}`;
        }
        iterations += 1/2;
      }, 30);
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   KONAMI CODE -> RED TEAM MODE
═══════════════════════════════════════════════════════════════ */
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiPosition = 0;

document.addEventListener('keydown', function(e) {
  if (e.key === konamiCode[konamiPosition]) {
    konamiPosition++;
    if (konamiPosition === konamiCode.length) {
      document.body.classList.toggle('red-team-mode');
      if(document.body.classList.contains('red-team-mode')) {
        appendMessage('ai', "WARNING: RED TEAM MODE ACTIVATED. NEURAL LINK COMPROMISED. ALL SYSTEMS INVERTED.");
        document.getElementById('ai-chat-window').classList.add('open');
      } else {
        appendMessage('ai', "SYSTEM RESTORED. Resuming standard operations.");
      }
      konamiPosition = 0;
    }
  } else {
    konamiPosition = 0;
  }
});




/* ═══════════════════════════════════════════════════════════════
   MATRIX RAIN TERMINAL LOGIC
═══════════════════════════════════════════════════════════════ */
function startMatrixRain(canvasId, container) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  
  canvas.width = container.clientWidth;
  canvas.height = 400;
  container.style.overflow = 'hidden';
  
  const chars = '01ABCDEFXYZ@#$%^&*()';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];
  for(let x=0; x < columns; x++) drops[x] = 1;
  const rainColor = document.body.classList.contains('red-team-mode') ? '#ef4444' : '#4ade80';
  
  let rainInterval = setInterval(() => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = rainColor;
    ctx.font = fontSize + 'px monospace';
    
    for(let i=0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);
        if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
  }, 33);
  
  setTimeout(() => {
    const hint = document.createElement('div');
    hint.style.position = 'absolute';
    hint.style.bottom = '10px';
    hint.style.left = '10px';
    hint.style.color = 'white';
    hint.style.zIndex = 10;
    hint.innerText = '[Type clear or press Ctrl+C to escape Matrix]';
    container.appendChild(hint);
  }, 2000);
  
  const pWrapper = document.createElement('div');
  pWrapper.className = 'term-line';
  pWrapper.style.position = 'absolute';
  pWrapper.style.bottom = '30px';
  pWrapper.style.left = '10px';
  pWrapper.style.zIndex = 10;
  
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.className = 'term-input';
  inp.style.width = '100px';
  
  pWrapper.appendChild(inp);
  container.appendChild(pWrapper);
  
  inp.focus();
  
  function destroyMatrix() {
    clearInterval(rainInterval);
    container.style.overflow = 'auto';
    container.innerHTML = '';
    setupInteractiveTerminal(container, null);
    document.removeEventListener('keydown', handleGlobalKey);
  }


  inp.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
      const val = inp.value.trim().toLowerCase();
      if(val === 'clear' || val === 'exit') {
        destroyMatrix();
      } else {
        inp.value = '';
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      destroyMatrix();
    }
  });


  function handleGlobalKey(e) {
    if (e.key === 'c' && e.ctrlKey) {
      destroyMatrix();
    }
  }
  document.addEventListener('keydown', handleGlobalKey);
}