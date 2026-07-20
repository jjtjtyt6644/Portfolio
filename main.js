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


// Sections in PINNED_RESPONSES are NEVER overridden by the API or cleared by mascot clicks.
// Arrays cycle through on each mascot click.
const PINNED_RESPONSES = {
  experience: [
    "This is a fake simulated terminal — not real! 😄 Try: help · ls · cat about.txt · whoami · pwd",
    "Psst, this terminal is just for show 🖥️ Try running: ./run_next_module.sh or type matrix for a surprise!",
    "Explore the fake filesystem! Try: cd secrets (if you dare) or cat about.txt to learn more about Junyu.",
    "Try: sudo — see what happens when you're not in the sudoers file 👀 Or echo anything you like!",
    "Type clear to wipe the terminal, or ls to list files. It's a playground — nothing will break 🙂"
  ]
}
const PINNED_INDEXES = {}

const CACHED_RESPONSES = {
  contact: "This is Junyu's contact info. Please note he is a high schooler!"
}


const SECTION_CONTEXT = {
  hero: "Junyu's Hero Section: A high schooler from Singapore passionate about Cybersecurity, AI, and Networking. Mission is breaking things legally.",
  about: "Junyu's About Section: 18+ GitHub repos. 2 IBM certifications. Specializes in Security, Networking, and rapid development.",
  certs: "Junyu's Certifications: IBM AI Certified and IBM Cyber Security Certified while still in high school.",
  builds: "Junyu's Projects: 1. CyberAttacks-Simulation (vulnerable site with SOC dashboard). 2. FocusMode (Chrome productivity extension). 3. Ai-Vision (AI browser assistant). 4. Proxyyy (a proxy server for traffic routing & security).",
  gallery: "Junyu's Projects Gallery: Everything he has built, including security, networking, AI, tools, and web projects.",
  experience: "Fake interactive terminal — try commands: help, ls, cat about.txt, whoami, pwd, echo [text], sudo, clear, ./run_next_module.sh, matrix.",
  contact: "Junyu's Contact Page. Please note he is a high schooler!"
}


async function fetchElaboration(sectionId) {

  // Always return pinned responses — never call the API for these sections
  if (PINNED_RESPONSES[sectionId]) {
    const msgs = PINNED_RESPONSES[sectionId]
    if (Array.isArray(msgs)) {
      const idx = (PINNED_INDEXES[sectionId] || 0) % msgs.length
      PINNED_INDEXES[sectionId] = idx + 1
      return msgs[idx]
    }
    return msgs
  }

  if (CACHED_RESPONSES[sectionId]) {
    return CACHED_RESPONSES[sectionId]
  }

  const cleanContext = SECTION_CONTEXT[sectionId] || "Junyu's Portfolio space.";

  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  let result = "";

  try {
    if (isLocal) {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) throw new Error("Local API key missing.");

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: "You are a supportive AI guide for Junyu's cybersecurity portfolio. Read the exact context of the section the user is looking at and summarize it in 1-2 friendly sentences. UNDER NO CIRCUMSTANCES should you give advice, critique, security warnings, or suggestions. You are strictly a narrator. Limit yourself to a maximum of one emoji. Do not use quotes, filler intros, overly hyped language, or ask questions."
            },
            {
              role: 'user',
              content: `The user is looking at this section on my portfolio right now:\n${cleanContext}`
            }
          ],
          max_tokens: 80,
          temperature: 0.4
        })
      });
      const data = await res.json();
      if (data.choices && data.choices.length > 0) {
        result = data.choices[0].message.content.trim();
      }
    } else {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: cleanContext })
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        result = data.choices[0].message.content.trim();
      }
    }

    if (result) {
      CACHED_RESPONSES[sectionId] = result;
      return result;
    }
    return "The server encountered an error while processing context.";
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


const TRACKED = ['hero', 'about', 'certs', 'builds', 'gallery', 'experience', 'contact']

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


  // Don't clear pinned sections — they should never re-fetch from the API
  if (!PINNED_RESPONSES[activeSection]) {
    CACHED_RESPONSES[activeSection] = null;
  }


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
  mascotChar.classList.add('peering')
  mascotBubble.style.opacity = '0'
  aiChatInput.focus()
})

aiChatClose.addEventListener('click', () => {
  aiChatWindow.classList.remove('open')
  mascotChar.classList.remove('peering')
  mascotBubble.style.opacity = '1'
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


  if (text.toLowerCase() === 'flag_mhz7f') {
    appendMessage('user', text)
    aiChatInput.value = ''

    setTimeout(() => {
      const specialDiv = document.createElement('div')
      specialDiv.className = 'chat-message ai-message'
      specialDiv.style.color = '#4ade80'
      specialDiv.style.fontFamily = 'monospace'
      specialDiv.innerHTML = "ROOT ACCESS GRANTED.<br/><br/>Bypassing security protocols...<br/>Welcome, Operator. Initiating Matrix sequence..."
      aiChatMessages.appendChild(specialDiv)
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight
      
      if (typeof startMatrixEffect === 'function') {
        startMatrixEffect();
      }
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
      if (index < iterations) {
        return originalText[index];
      }
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');

    if (iterations >= originalText.length) {
      clearInterval(interval);
      element.textContent = originalText;
    }
    iterations += 1 / 3;
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
  if (terminalStarted) return;
  terminalStarted = true;
  const termBody = document.getElementById('terminal-body');
  if (!termBody) return;

  const commands = [
    { text: "nmap localhost -p 22,80,443", type: "cmd", delay: 500 },
    { text: "Starting Nmap 7.94 ( https://nmap.org ) at 2024", type: "out", delay: 1000 },

    { text: "Port 443/tcp open https", type: "out", delay: 1900 },
    { text: "cat experience.timeline", type: "cmd", delay: 2800 },
    { text: "[2023] High School - Ideation", type: "out", delay: 3600 },
    { text: "[2024 - 2025] Testing projects and building", type: "out", delay: 4000 },
    { text: "[2026] Ibm certifications and learning cybersecurity", type: "out", delay: 4400 },
    { text: "Status: Ready for new challenges and projects.", type: "out", delay: 4800 }
  ];

  const cursor = document.createElement('span');
  cursor.className = 'term-cursor';
  termBody.appendChild(cursor);

  commands.forEach((cmd) => {
    setTimeout(() => {
      cursor.remove();
      const line = document.createElement('span');
      line.className = cmd.type === 'cmd' ? 'term-line term-command' : 'term-line';
      if (cmd.type === 'cmd') {
        line.innerHTML = `root@junyu:~$ `;
        termBody.appendChild(line);
        let i = 0;
        let typeInt = setInterval(() => {
          line.innerHTML += cmd.text.charAt(i);
          i++;
          if (i >= cmd.text.length) {
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
        gsap.fromTo(line, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3 });
        termBody.scrollTop = termBody.scrollHeight;
      }
    }, cmd.delay);
  });


  setTimeout(() => setupInteractiveTerminal(termBody, cursor), 6000);
}

function setupInteractiveTerminal(termBody, cursor) {
  if (cursor && cursor.parentNode) cursor.remove();

  // ─── Virtual File System ───
  const vfs = {
    '~': {
      type: 'dir',
      contents: {
        'experience.timeline': { type: 'file', content: "2025: Built Portfolio<br/>2024: IBM Certified AI & Cyber Security<br/>2023: Began journey into networking and pentesting." },
        'run_next_module.sh': { type: 'file', content: "[OK] Initiating module...<br/>[OK] Bypassing mainframe...<br/>[OK] Payload injected successfully.<br/><span style=\"color:#a78bfa; font-weight:bold;\">Welcome to the next level.</span>", exec: true },
        'about.txt': { type: 'file', content: "Hi, I'm Junyu - Cyber Security & Networking Enthusiast.<br/>Contact: yaoprox0@gmail.com<br/>GitHub: jjtjtyt6644" },
        'secrets': {
          type: 'dir',
          locked: true,
          contents: {
            'flag.txt': { type: 'file', content: "flag{h1r3_m3_plz}" },
            '.bash_history': { type: 'file', content: "nmap localhost<br/>sudo su<br/>matrix" }
          }
        }
      }
    }
  };

  let cwd = '~';

  function getPromptText() {
    return `root@junyu:${cwd}$ `;
  }

  const promptWrapper = document.createElement('div');
  promptWrapper.className = 'term-line';
  promptWrapper.style.opacity = 1;
  promptWrapper.style.display = 'flex';

  const promptLabel = document.createElement('span');
  promptLabel.className = 'term-command';
  promptLabel.textContent = getPromptText();
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
    if (e.key === 'Enter') {
      const val = input.value.trim();
      input.value = '';

      const echo = document.createElement('div');
      echo.className = 'term-line';
      echo.style.opacity = 1;
      echo.innerHTML = `<span class="term-command">${getPromptText()}</span> <span style="color:#eef2ff">${val.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`;
      promptWrapper.before(echo);

      if (val !== '') {
        const out = document.createElement('div');
        out.className = 'term-line';
        out.style.opacity = 1;

        const args = val.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
        const cmd = args[0].toLowerCase();
        const parsedArgs = args.slice(1).map(a => a.replace(/^["']|["']$/g, ''));

        let outputStr = '';

        // Current Directory Context
        let currentDirObj = cwd === '~' ? vfs['~'] : vfs['~'].contents[cwd.replace('~/', '')];
        if (!currentDirObj) currentDirObj = vfs['~'];

        switch (cmd) {
          case 'help':
            outputStr = `Available commands:<br/> - ls [dir]<br/> - cd [dir]<br/> - cat [file]<br/> - pwd<br/> - whoami<br/> - clear<br/> - echo [text]<br/> - ./run_next_module.sh<br/> - matrix<br/> - sudo`;
            break;
          case 'whoami':
            outputStr = `junyu - Cyber Security & Networking Enthusiast`;
            break;
          case 'pwd':
            outputStr = cwd === '~' ? '/home/junyu' : `/home/junyu/${cwd.replace('~/', '')}`;
            break;
          case 'clear':
            termBody.innerHTML = '';
            break;
          case 'date':
            outputStr = new Date().toString();
            break;
          case 'echo':
            outputStr = parsedArgs.join(' ').replace(/</g, "&lt;").replace(/>/g, "&gt;");
            break;
          case 'sudo':
            outputStr = `junyu is not in the sudoers file. This incident will be reported.`;
            break;
          case 'ls': {
            let targetDir = currentDirObj;
            let targetPath = parsedArgs[0] || '';
            let showHidden = parsedArgs.includes('-a') || parsedArgs.includes('-la') || parsedArgs.includes('-al');
            let isLong = parsedArgs.includes('-l') || parsedArgs.includes('-la') || parsedArgs.includes('-al');

            // Cleanup args for path resolution
            targetPath = parsedArgs.filter(a => !a.startsWith('-'))[0] || '';

            if (targetPath && targetPath !== '.' && targetPath !== './') {
              if (targetPath === '..' || targetPath === '../') {
                targetDir = cwd === '~' ? { type: 'dir', contents: { 'junyu': { type: 'dir' } } } : vfs['~'];
              } else if (currentDirObj.contents[targetPath] && currentDirObj.contents[targetPath].type === 'dir') {
                targetDir = currentDirObj.contents[targetPath];
              } else {
                outputStr = `ls: cannot access '${targetPath}': No such file or directory`;
                break;
              }
            }

            if (targetDir.locked && cwd !== `~/${targetPath}`) {
              outputStr = `ls: cannot open directory '${targetPath}': Permission denied`;
              break;
            }

            let contents = Object.keys(targetDir.contents || {});
            if (!showHidden) contents = contents.filter(f => !f.startsWith('.'));

            if (isLong) {
              outputStr = contents.map(f => {
                const node = targetDir.contents[f];
                const perm = node.type === 'dir' ? 'drwxr-xr-x' : (node.exec ? '-rwxr-xr-x' : '-rw-r--r--');
                const color = node.type === 'dir' ? '#3b82f6' : (node.exec ? '#22c55e' : '#eef2ff');
                return `${perm} 1 root root 4096 Jan  1 00:00 <span style="color:${color}">${f}</span>`;
              }).join('<br/>');
            } else {
              outputStr = contents.map(f => {
                const node = targetDir.contents[f];
                const color = node.type === 'dir' ? '#3b82f6' : (node.exec ? '#22c55e' : '#eef2ff');
                return `<span style="color:${color}; margin-right: 15px;">${f}</span>`;
              }).join('');
            }
            break;
          }
          case 'cd': {
            const targetPath = parsedArgs[0] || '~';
            if (targetPath === '~' || targetPath === '/home/junyu') {
              cwd = '~';
            } else if (targetPath === '..' || targetPath === '../') {
              cwd = '~'; // Keep it simple, parent of anywhere is home for now
            } else if (targetPath === '/') {
              outputStr = `bash: cd: /: Permission denied`;
            } else if (currentDirObj.contents && currentDirObj.contents[targetPath]) {
              const node = currentDirObj.contents[targetPath];
              if (node.type !== 'dir') {
                outputStr = `bash: cd: ${targetPath}: Not a directory`;
              } else if (node.locked) {
                outputStr = `bash: cd: ${targetPath}: Permission denied`;
              } else {
                cwd = cwd === '~' ? `~/${targetPath}` : `${cwd}/${targetPath}`;
              }
            } else {
              outputStr = `bash: cd: ${targetPath}: No such file or directory`;
            }
            promptLabel.textContent = getPromptText();
            break;
          }
          case 'cat': {
            const targetPath = parsedArgs[0];
            if (!targetPath) {
              outputStr = `cat: missing operand`;
              break;
            }
            if (currentDirObj.contents && currentDirObj.contents[targetPath]) {
              const node = currentDirObj.contents[targetPath];
              if (node.type === 'dir') {
                outputStr = `cat: ${targetPath}: Is a directory`;
              } else {
                outputStr = node.content;
              }
            } else {
              outputStr = `cat: ${targetPath}: No such file or directory`;
            }
            break;
          }
          case './run_next_module.sh':
          case 'sh':
            if (cmd === 'sh' && parsedArgs[0] !== 'run_next_module.sh') {
              outputStr = `sh: ${parsedArgs[0] || 'missing operand'}: No such file or directory`;
              break;
            }
            if (cwd !== '~') {
              outputStr = `bash: ./run_next_module.sh: No such file or directory`;
              break;
            }
            outputStr = vfs['~'].contents['run_next_module.sh'].content;
            break;
          case 'matrix':
            termBody.innerHTML = '<canvas id="matrix-canvas"></canvas>';
            startMatrixRain('matrix-canvas', termBody);
            return;
          default:
            outputStr = `bash: ${cmd}: command not found`;
        }

        if (cmd !== 'clear') {
          out.innerHTML = outputStr;
          if (outputStr !== '') promptWrapper.before(out);
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

  for (let i = 0; i < 60; i++) particles.push(new Particle());

  let mouse = { x: null, y: null };
  const contactSection = document.getElementById('contact');
  if (contactSection) {
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

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(125, 211, 252, ${0.4 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      if (mouse.x != null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(125, 211, 252, ${0.8 * (1 - dist / 150)})`;
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
    if (!emailBtn.classList.contains('decrypted')) {
      e.preventDefault();
      const realEmail = emailBtn.getAttribute('data-email');
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
      let iterations = 0;
      const interval = setInterval(() => {
        emailBtn.textContent = realEmail.split('').map((letter, index) => {
          if (index < iterations) return realEmail[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        if (iterations >= realEmail.length) {
          clearInterval(interval);
          emailBtn.classList.add('decrypted');
          emailBtn.href = `mailto:${realEmail}`;
        }
        iterations += 1 / 2;
      }, 30);
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   KONAMI CODE -> RED TEAM MODE
═══════════════════════════════════════════════════════════════ */
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiPosition = 0;

document.addEventListener('keydown', function (e) {
  if (e.key === konamiCode[konamiPosition]) {
    konamiPosition++;
    if (konamiPosition === konamiCode.length) {
      document.body.classList.toggle('red-team-mode');
      if (document.body.classList.contains('red-team-mode')) {
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
  for (let x = 0; x < columns; x++) drops[x] = 1;
  const rainColor = document.body.classList.contains('red-team-mode') ? '#ef4444' : '#4ade80';

  let rainInterval = setInterval(() => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = rainColor;
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
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
    if (e.key === 'Enter') {
      const val = inp.value.trim().toLowerCase();
      if (val === 'clear' || val === 'exit') {
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
  document.addEventListener('keydown', handleGlobalKey)
}

/* ═══════════════════════════════════════════════════════════════
   NAV ACTIVE SECTION TRACKER
═══════════════════════════════════════════════════════════════ */
const navBtns = document.querySelectorAll('.nav-btn[data-nav]')
const sectionIds = ['about', 'certs', 'builds', 'gallery', 'experience', 'contact']

sectionIds.forEach(id => {
  const el = document.getElementById(id)
  if (!el) return
  ScrollTrigger.create({
    trigger: el,
    start: 'top 55%',
    end: 'bottom 55%',
    onEnter: () => setActiveNav(id),
    onEnterBack: () => setActiveNav(id),
  })
})

function setActiveNav(id) {
  navBtns.forEach(btn => btn.classList.remove('nav-active'))
  const active = document.querySelector(`.nav-btn[data-nav="${id}"]`)
  if (active) active.classList.add('nav-active')
}

/* ═══════════════════════════════════════════════════════════════
   BUILDS PROGRESS DOTS
═══════════════════════════════════════════════════════════════ */
const bpDots = document.querySelectorAll('.bp-dot')

function setActiveDot(index) {
  bpDots.forEach(d => d.classList.remove('active'))
  if (bpDots[index]) bpDots[index].classList.add('active')
}

// Sync dot with scroll progress of builds section
ScrollTrigger.create({
  trigger: '.builds-section',
  start: 'top top',
  end: () => `+=${window.innerHeight * 5}`,
  scrub: true,
  onUpdate: (self) => {
    const idx = Math.min(Math.floor(self.progress * 4), 3)
    setActiveDot(idx)
  }
})

/* ═══════════════════════════════════════════════════════════════
   PROJECTS GALLERY
═══════════════════════════════════════════════════════════════ */
const GALLERY_PROJECTS = [
  {
    name: 'CyberAttacks-Simulation',
    desc: 'A real vulnerable website built to practice SQL injection, XSS, and other common attack vectors. Ships with a fully built-in SOC monitoring dashboard for real-time alerting and defense analysis.',
    lang: 'HTML',
    tags: ['security'],
    icon: '🛡️',
    url: 'https://github.com/jjtjtyt6644/CyberAttacks-Simulation',
  },
  {
    name: 'FocusMode',
    desc: 'A Google Chrome extension that lets you block distracting websites, set deep-work timers, and enforce study sessions directly from the browser toolbar.',
    lang: 'JavaScript',
    tags: ['tools'],
    icon: '⏱️',
    url: 'https://github.com/jjtjtyt6644/FocusMode',
  },
  {
    name: 'Ai-Vision',
    desc: 'An AI-powered Google Chrome extension that works like any other AI assistant but lives in your browser. Query images and page content with natural language with real-time AI analysis.',
    lang: 'JavaScript',
    tags: ['ai', 'tools'],
    icon: '🤖',
    url: 'https://github.com/jjtjtyt6644/Ai-Vison-',
  },
  {
    name: 'Proxyyy',
    desc: 'A lightweight HTTP proxy server built to handle network traffic routing efficiently while providing security interception layers for deep packet analysis.',
    lang: 'Python',
    tags: ['networking', 'security'],
    icon: '🌐',
    url: 'https://github.com/jjtjtyt6644/Proxyyy',
  },
  {
    name: 'AutoQuest-Plugin',
    desc: 'A Vencord plugin that completes multiple Discord quests in the background simultaneously. Built using TypeScript by extending the Vencord modding framework.',
    lang: 'TypeScript',
    tags: ['tools'],
    icon: '🎮',
    url: 'https://github.com/jjtjtyt6644/AutoQuest-Plugin',
  },
  {
    name: 'Autoquest-Installer',
    desc: 'A fully automated installer that injects the AutoQuest plugin into Discord by modifying Vencord files. One-click setup experience built with CSS and shell scripting.',
    lang: 'CSS',
    tags: ['tools'],
    icon: '⚙️',
    url: 'https://github.com/jjtjtyt6644/Autoquest-Installer',
  },
  {
    name: 'Aetheris',
    desc: 'A distraction-free, aesthetically driven productivity workspace for students and creators. Full TypeScript app with ambient modes, task tracking, and focus sessions.',
    lang: 'TypeScript',
    tags: ['tools', 'web'],
    icon: '🌌',
    url: 'https://github.com/jjtjtyt6644/Aetheris',
  },
  {
    name: 'Itinfinder-Website',
    desc: 'ItinFinder is an ultra-modern, premium cross-platform React Native (Expo) travel application. It utilizes cutting-edge AI (Groq + OpenRouter) and live web scraping agents (TinyFish) to craft ultra-specific, vivid, and culturally immersive travel itineraries — with robust offline support, background intelligence, and a Pro cloud tier.',
    lang: 'HTML',
    tags: ['web', 'tools'],
    icon: '🔍',
    url: 'https://github.com/jjtjtyt6644/Itinfinder-Website',
  },
  {
    name: 'Voting-web',
    desc: 'A full-featured web voting platform with real-time vote tracking, candidate profiles, and a clean administrative dashboard for managing polls.',
    lang: 'HTML',
    tags: ['web'],
    icon: '🗳️',
    url: 'https://github.com/jjtjtyt6644/Voting-web',
  },
  {
    name: 'Studify',
    desc: 'A productivity-first study platform for students. Features timer-based sessions, note-taking, and progress analytics in a clean minimalist interface.',
    lang: 'TypeScript',
    tags: ['web', 'tools'],
    icon: '📚',
    url: 'https://github.com/jjtjtyt6644/Studify',
  },
  {
    name: 'tution',
    desc: 'A TypeScript-based tuition management platform. Handles scheduling, student profiles, and session tracking for private tutors and educational centres.',
    lang: 'TypeScript',
    tags: ['web'],
    icon: '🏫',
    url: 'https://github.com/jjtjtyt6644/tution',
  },
  {
    name: 'Portfolio',
    desc: 'This portfolio website itself — built with Vite, GSAP, and Lenis. Featuring cinematic scroll animations, an AI mascot, interactive terminal, and a custom cursor.',
    lang: 'JavaScript',
    tags: ['web'],
    icon: '✨',
    url: 'https://github.com/jjtjtyt6644/Portfolio',
  },

]

const galleryGrid = document.getElementById('gallery-grid')
const filterBtns = document.querySelectorAll('.gf-btn')

function getLangColor(lang) {
  const map = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3572a5',
    HTML: '#e34c26',
    CSS: '#563d7c',
  }
  return map[lang] || '#64748b'
}

function renderGallery(filter = 'all') {
  galleryGrid.innerHTML = ''
  const filtered = filter === 'all'
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter(p => p.tags.includes(filter))

  filtered.forEach((proj, i) => {
    const card = document.createElement('div')
    card.className = 'gallery-card'
    card.style.opacity = '0'
    card.style.transform = 'translateY(30px)'
    card.setAttribute('data-tags', proj.tags.join(','))

    const tagsHTML = proj.tags.map(t => `<span class="gc-tag">${t}</span>`).join('')
    const forkBadge = proj.isFork ? `<span class="gc-tag" style="opacity:0.6">fork</span>` : ''

    card.innerHTML = `
      <div class="gc-header">
        <div class="gc-icon">${proj.icon}</div>
        <span class="gc-lang" style="color:${getLangColor(proj.lang)};border-color:${getLangColor(proj.lang)}33">${proj.lang}</span>
      </div>
      <div class="gc-title">${proj.name}</div>
      <p class="gc-desc">${proj.desc}</p>
      <div class="gc-footer">
        <div class="gc-tags">${tagsHTML}${forkBadge}</div>
        <a href="${proj.url}" target="_blank" class="gc-link" onclick="event.stopPropagation()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          GitHub
        </a>
      </div>
    `

    card.addEventListener('click', () => {
      window.open(proj.url, '_blank')
    })

    galleryGrid.appendChild(card)

    // Stagger animate in
    setTimeout(() => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: i * 0.05,
      })
    }, 10)
  })
}

// Init gallery
renderGallery('all')

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    renderGallery(btn.dataset.filter)
  })
})

// Scroll-trigger entrance for gallery section
ScrollTrigger.create({
  trigger: '.gallery-section',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    gsap.from('.gallery-heading .line', {
      y: '110%',
      duration: 1.4,
      stagger: 0.1,
      ease: 'expo.out',
    })
    gsap.from('.gallery-sub', {
      opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.4
    })
    gsap.from('.gf-btn', {
      opacity: 0, y: 15, stagger: 0.07, duration: 0.6, ease: 'power2.out', delay: 0.6
    })
  }
})

/* ═══════════════════════════════════════════════════════════════
   MATRIX EASTER EGG
═══════════════════════════════════════════════════════════════ */
window.startMatrixEffect = function() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.opacity = '1';
  
  const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
  const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';
  const alphabet = katakana + latin + nums;
  
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  
  const drops = [];
  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }
  
  let interval;
  
  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  interval = setInterval(draw, 30);
  
  setTimeout(() => {
    canvas.style.opacity = '0';
    setTimeout(() => {
      clearInterval(interval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 1000);
  }, 5000);
};