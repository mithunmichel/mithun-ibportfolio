/* ── Boot ─────────────────────────────────────────────── */
let D = {};

async function boot() {
  const res = await fetch('./data/content.json');
  D = await res.json();
  buildNav();
  window.addEventListener('hashchange', route);
  route();
}

/* ── Router ───────────────────────────────────────────── */
function route() {
  const hash = location.hash.replace('#','') || 'home';
  const main = document.getElementById('main');
  main.innerHTML = '';
  window.scrollTo(0,0);
  closeMobileNav();
  setActive(hash);
  const map = { home, about, philosophy, units, demos, contact };
  if      (hash.startsWith('grade--'))  gradeDetail(hash.replace('grade--',''));
  else if (hash.startsWith('unit--'))   unitDetail(hash.replace('unit--',''));
  else if (hash.startsWith('lesson--')) lessonDetail(hash.replace('lesson--',''));
  else (map[hash] || home)();
}
function go(page) { location.hash = page; }

/* ── SVG Icons (Lucide line style, inline) ────────────── */
const ICONS = {
  search:    `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  lightbulb: `<svg viewBox="0 0 24 24"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  target:    `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  users:     `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  repeat:    `<svg viewBox="0 0 24 24"><path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
  eye:       `<svg viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  heart:     `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  layers:    `<svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  book:      `<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  clock:     `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  award:     `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  link:      `<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  chevron:   `<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>`,
};
function icon(name) { return `<div class="icon-wrap">${ICONS[name]||ICONS.target}</div>`; }

/* ── Nav ──────────────────────────────────────────────── */
function buildNav() {
  document.getElementById('nav').innerHTML = `
    <div class="nav-inner">
      <a href="#home" class="nav-brand">${D.site.name}</a>
      <nav class="nav-links">
        <a href="#about">About</a>
        <a href="#philosophy">Philosophy</a>
        <a href="#units">Units</a>
        <a href="#demos">Demo Lessons</a>
        <a href="#contact" class="nav-cta">Get in Touch</a>
      </nav>
      <button class="burger" id="burgerBtn" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-nav" id="mobileNav">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#philosophy">Philosophy</a>
      <a href="#units">Units</a>
      <a href="#demos">Demo Lessons</a>
      <a href="#contact">Get in Touch</a>
    </div>`;
  document.getElementById('burgerBtn').addEventListener('click', () => {
    const btn = document.getElementById('burgerBtn');
    const menu = document.getElementById('mobileNav');
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
}
function closeMobileNav() {
  document.getElementById('mobileNav')?.classList.remove('open');
  document.getElementById('burgerBtn')?.classList.remove('open');
}
function setActive(page) {
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const p = a.getAttribute('href').replace('#','');
    a.classList.toggle('active',
      p === page ||
      (page.startsWith('grade--') && p === 'units') ||
      (page.startsWith('unit--')  && p === 'units') ||
      (page.startsWith('lesson--')&& p === 'demos')
    );
  });
}

/* ── HOME ─────────────────────────────────────────────── */
function home() {
  const h = D.home;
  set(`
    <section class="hero">
      <div class="wrap">
        <div class="hero-eyebrow">IB MYP Design — Preparation Portfolio</div>
        <h1>${h.headline}<br><span class="accent">${h.headlineAccent}</span></h1>
        <p class="hero-sub">${h.subline}</p>
        <div class="btn-group">
          <a href="#units"      class="btn btn-primary">Explore Unit Plans</a>
          <a href="#philosophy" class="btn btn-outline">My Design Philosophy</a>
        </div>
        <div class="hero-stats">
          <div class="stat-item"><span class="stat-label">Education</span><span class="stat-value">M.Des — IDC, IIT Bombay</span></div>
          <div class="stat-item"><span class="stat-label">Current Role</span><span class="stat-value">UX Designer, Ideaforge Technology</span></div>
          <div class="stat-item"><span class="stat-label">Focus</span><span class="stat-value">IB MYP Design — Years 1–5</span></div>
          <div class="stat-item"><span class="stat-label">Location</span><span class="stat-value">Bangalore, India</span></div>
        </div>
      </div>
    </section>

    <section class="sec sec-alt">
      <div class="wrap-wide">
        <div class="sec-hdr wrap">
          <span class="label">My Approach to Teaching Design</span>
          <h2>Four principles that will guide my teaching approach</h2>
        </div>
        <div class="wrap-wide">
          <div class="pillars-grid">
            ${[
              {icon:'search',  t:'Design Thinking',       d:'Systematic problem-solving methodologies tailored for student cognitive development.'},
              {icon:'lightbulb',t:'Inquiry-Based Learning',d:'Fostering curiosity through open-ended investigations and critical questioning.'},
              {icon:'target',  t:'User-Centered Approach', d:'Applying empathy to solve real human needs through iterative design cycles.'},
              {icon:'users',   t:'Mentorship',             d:'Guiding the next generation of thinkers with industry-standard design practice.'},
            ].map(p=>`
              <div class="card card-static pillar-card">
                ${icon(p.icon)}
                <h3>${p.t}</h3>
                <p>${p.d}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <section class="sec sec-white">
      <div class="wrap">
        <div class="sec-hdr">
          <span class="label">Framework Understanding</span>
          <h2>The IB MYP Design Cycle</h2>
          <p>Students are assessed not only on what they produce, but on how they think, plan, and reflect throughout every stage.</p>
        </div>
        <div class="inquiry-grid">
          ${[
            {c:'Criterion A',t:'Inquiring & Analysing',d:'Identifying the problem, researching existing solutions, and defining a clear design brief. Emphasis on asking the right questions before attempting any solution.'},
            {c:'Criterion B',t:'Developing Ideas',     d:'Generating multiple design concepts, evaluating against specifications, and justifying a chosen direction through annotated sketches and reasoning.'},
            {c:'Criterion C',t:'Creating the Solution',d:'Constructing the solution, demonstrating technical skill and following a plan — adapting thoughtfully when the process reveals new constraints.'},
            {c:'Criterion D',t:'Evaluating',           d:'Testing the solution against the design brief, reflecting honestly on its effectiveness, and identifying specific, meaningful improvements.'},
          ].map(x=>`
            <div class="card card-static inquiry-card">
              <span class="inquiry-type">${x.c}</span>
              <h3 style="font-size:.9rem;font-family:var(--sans);font-weight:500;margin-bottom:8px">${x.t}</h3>
              <p style="font-size:.82rem;font-style:normal">${x.d}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="sec sec-alt">
      <div class="wrap-wide">
        <div class="sec-hdr wrap">
          <span class="label">Lesson Design</span>
          <h2>Featured Demo Lessons</h2>
          <p>Prepared lesson plans applying the MYP Design Cycle — structured and ready for the classroom.</p>
        </div>
        <div class="wrap-wide">
          <div class="lesson-previews">
            ${h.lessonHighlights.map(l=>`
              <div class="card card-click lesson-preview" onclick="go('lesson--${D.demos.lessons.find(x=>x.title===l.title)?.id||'demos'}')">
                <span class="duration-tag">${l.duration}</span>
                <h3>${l.title}</h3>
                <p>${l.desc}</p>
                <span class="arrow-link">View Lesson</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <section class="sec sec-white">
      <div class="wrap">
        <div style="max-width:500px">
          <span class="label">Open to Opportunities</span>
          <h2>Seeking IB MYP Design teaching positions</h2>
          <p style="margin:16px 0 28px">I am actively looking for IB MYP Design roles and am prepared to conduct a demo lesson or share additional unit plans on request.</p>
          <div class="btn-group">
            <a href="#contact" class="btn btn-primary">Get in Touch</a>
          </div>
        </div>
      </div>
    </section>
  `);
}

/* ── ABOUT ────────────────────────────────────────────── */
function about() {
  const a = D.about;
  set(`
    <section class="hero" style="padding:80px 0 64px">
      <div class="wrap">
        <span class="label">About</span>
        <h1 style="white-space:pre-line">${a.headline}</h1>
        <div class="divider"></div>
        <p style="font-size:1.05rem;max-width:580px;margin-bottom:18px">${a.intro}</p>
        ${a.paragraphs.map(p=>`<p style="max-width:580px;margin-bottom:14px">${p}</p>`).join('')}
      </div>
    </section>

    <section class="sec sec-white">
      <div class="wrap">
        <div class="two-col">
          <div>
            <span class="label">Education</span>
            <h2 style="margin-bottom:20px">Academic Background</h2>
            ${a.education.map(e=>`
              <div class="card card-static edu-card" style="margin-bottom:10px">
                <h3>${e.degree}</h3>
                <div class="inst">${e.institution}</div>
                ${e.detail?`<p>${e.detail}</p>`:''}
              </div>`).join('')}
          </div>
          <div>
            <span class="label">IB Preparation</span>
            <h2 style="margin-bottom:20px">Framework Awareness</h2>
            <div class="check-list">
              ${a.ibReadiness.map(r=>`<div class="check-item">${r}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="sec sec-alt">
      <div class="wrap">
        <div class="sec-hdr">
          <span class="label">Professional Experience</span>
          <h2>What I bring from industry</h2>
          <p>My UX background is not separate from my teaching preparation — it is the source of it. The same structured thinking I practise at work maps directly to the MYP Design cycle.</p>
        </div>
        <div class="card card-static exp-card">
          <h3>${a.experience.role}</h3>
          <div class="org">${a.experience.org} · ${a.experience.period}</div>
          <div class="exp-points">
            ${a.experience.points.map(p=>`<div class="exp-point">${p}</div>`).join('')}
          </div>
        </div>
      </div>
    </section>
  `);
}

/* ── PHILOSOPHY ───────────────────────────────────────── */
function philosophy() {
  const p = D.philosophy;
  set(`
    <section class="hero" style="padding:80px 0 64px">
      <div class="wrap">
        <span class="label">Teaching Philosophy</span>
        <h1>${p.headline}</h1>
        <div class="divider"></div>
        <p style="max-width:560px;font-size:1rem">${p.subline}</p>
      </div>
    </section>

    <section class="sec sec-white">
      <div class="wrap">
        <div class="phil-quote">"${p.quote}"</div>
        <p style="max-width:580px">${p.closingStatement}</p>
      </div>
    </section>

    <section class="sec sec-alt">
      <div class="wrap">
        <div class="sec-hdr">
          <span class="label">Four Pillars</span>
          <h2>What I believe good design education does</h2>
        </div>
        <div class="pillars-grid">
          ${p.pillars.map((pl,i)=>`
            <div class="card card-static pillar-card">
              <span class="label" style="margin-bottom:8px">0${i+1}</span>
              <h3>${pl.title}</h3>
              <p>${pl.desc}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="sec sec-white">
      <div class="wrap">
        <div class="sec-hdr">
          <span class="label">Industry → Classroom</span>
          <h2>Translating professional practice into teaching</h2>
          <p>Every method I used in UX work maps directly onto a classroom learning activity. This translation is intentional, not accidental.</p>
        </div>
        <table class="trans-table">
          <thead><tr><th>Industry Practice</th><th class="trans-arrow"></th><th>Classroom Application</th></tr></thead>
          <tbody>
            ${p.translations.map(r=>`
              <tr>
                <td>${r.industry}</td>
                <td class="trans-arrow">→</td>
                <td>${r.classroom}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `);
}

/* ── UNITS — grade card overview ──────────────────────── */
function units() {
  const u = D.units;
  const ai = u.aiProgression;
  const gradeInfo = {
    'MYP 1': { ages:'Ages 11–12', desc:'Students begin by observing the world carefully — deconstructing everyday objects to understand form, function, and basic design principles.', ib:['Foundations of Observation','Criterion A · B'] },
    'MYP 2': { ages:'Ages 12–13', desc:'Students move from observation to understanding users — developing empathy for the people they are designing for and the contexts they live in.', ib:['Understanding Users','Criterion A · B · C · D'] },
    'MYP 3': { ages:'Ages 13–14', desc:'Students begin thinking in systems — understanding how design decisions create ripple effects beyond the immediate product or solution.', ib:['Systems Thinking','All Criteria'] },
    'MYP 4': { ages:'Ages 14–15', desc:'Students work within constraints — learning that real-world design always involves limitations of material, time, budget, and regulation.', ib:['Designing with Constraints','Criterion A · B · C · D'] },
    'MYP 5': { ages:'Ages 15–16', desc:'Students take full ownership — independently defining their problem, designing their solution, and evaluating their impact.', ib:['Independent Thinking','Full Autonomy'] },
  };
  set(`
    <section class="hero" style="padding:80px 0 60px">
      <div class="wrap">
        <span class="label">Curriculum Architecture</span>
        <h1>MYP Design Units</h1>
        <div class="divider"></div>
        <p style="max-width:560px">${u.intro}</p>
      </div>
    </section>

    <section class="sec">
      <div class="wrap-wide">
        <div class="grade-cards">
          ${u.levels.map(lvl => {
            const info = gradeInfo[lvl.grade] || {};
            const fullCount = lvl.units.filter(x=>x.status==='full').length;
            const total = lvl.units.length;
            const hasAi = lvl.units.some(x=>x.isAiUnit);
            return `
              <div class="card card-click grade-card" onclick="go('grade--${lvl.grade.replace(' ','-')}')">
                <span class="grade-card-num">${lvl.grade}</span>
                <h3>${lvl.theme}</h3>
                <span class="theme">${info.ages||''}</span>
                <p>${info.desc||''}</p>
                <div class="grade-card-tags">
                  ${(info.ib||[]).map(t=>`<span class="tag">${t}</span>`).join('')}
                  ${hasAi?'<span class="tag" style="background:#EDE9FF;color:#6D28D9">Includes AI Unit</span>':''}
                </div>
                <div class="grade-card-footer">
                  <span class="unit-count">${total} unit${total!==1?'s':''} · ${fullCount} fully detailed</span>
                  <span class="arrow-link">Explore</span>
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>
    </section>

    <!-- AI Progression Strip -->
    <section class="sec sec-alt">
      <div class="wrap">
        <div class="sec-hdr">
          <span class="label" style="color:#6D28D9">AI Across the Curriculum</span>
          <h2>${ai.tagline}</h2>
          <p>${ai.intro}</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${ai.levels.map(al=>`
            <div class="card ${al.status==='full'?'card-click':'card-static'}"
                 style="display:flex;align-items:flex-start;gap:20px;padding:20px 24px"
                 ${al.status==='full'?`onclick="go('unit--${al.unitId}')"`:''}
            >
              <div style="min-width:72px">
                <span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:.7rem;font-weight:600;background:#EDE9FF;color:#6D28D9">${al.grade}</span>
              </div>
              <div style="flex:1">
                <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:4px">
                  <h3 style="font-family:var(--sans);font-weight:500;font-size:.95rem">${al.unitTitle}</h3>
                  <span style="font-size:.75rem;font-weight:500;color:#6D28D9">${al.focus}</span>
                </div>
                <p style="font-size:.82rem;margin-bottom:6px">${al.summary}</p>
                <span style="font-size:.75rem;font-style:italic;color:var(--txt-3)">Big idea: "${al.bigIdea}"</span>
              </div>
              <div style="flex-shrink:0">
                ${al.status==='full'
                  ? '<span style="font-size:.7rem;font-weight:600;padding:3px 10px;border-radius:20px;background:#E6F4ED;color:#1A7F5A">Full Unit ↗</span>'
                  : '<span style="font-size:.7rem;color:var(--txt-3)">In Development</span>'}
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>
  `);
}

/* ── GRADE DETAIL ─────────────────────────────────────── */
function gradeDetail(gradeSlug) {
  const grade = gradeSlug.replace('-',' ');
  const lvl = D.units.levels.find(l=>l.grade===grade);
  if (!lvl) { go('units'); return; }
  set(`
    <section class="unit-detail-hero">
      <div class="wrap">
        <div class="breadcrumb">
          <a href="#units">Units</a>
          <span class="breadcrumb-sep">›</span>
          <span>${lvl.grade}</span>
        </div>
        <span class="tag tag-grade" style="margin-bottom:14px;display:inline-block">${lvl.grade}</span>
        <h1 style="margin-bottom:8px">${lvl.theme}</h1>
        <p style="max-width:520px">${lvl.units.length} unit${lvl.units.length!==1?'s':''} · Click a unit to see full details</p>
      </div>
    </section>

    <section class="sec">
      <div class="wrap-wide">
        <div class="units-grid">
          ${lvl.units.map(unit=>`
            <div class="card ${unit.status==='full'?'card-click':'card-static'} unit-card"
                 ${unit.status==='full'?`onclick="go('unit--${unit.id}')"`:''}
                 style="${unit.status!=='full'?'opacity:.8':''}">
              <div class="unit-card-top">
                ${unit.isAiUnit
                  ? '<span class="tag" style="background:#EDE9FF;color:#6D28D9;font-weight:600">AI Unit</span>'
                  : ''}
                <span class="tag ${unit.status==='full'?'tag-full':'tag-outline'}">${unit.status==='full'?'Full Unit':'Outline'}</span>
                <span class="tag">${unit.duration}</span>
              </div>
              <h3>${unit.title}</h3>
              <p>${unit.desc}</p>
              ${unit.isAiUnit && unit.bigIdea ? `
              <div style="margin-bottom:12px;padding:8px 12px;background:#F5F3FF;border-radius:var(--r);border-left:3px solid #6D28D9">
                <span style="font-size:.72rem;font-weight:500;color:#6D28D9;font-style:italic">"${unit.bigIdea}"</span>
              </div>` : ''}
              <div class="unit-card-meta">
                <span class="tag">${unit.focus}</span>
                ${unit.criteria.map(c=>`<span class="tag">Crit. ${c}</span>`).join('')}
              </div>
              ${unit.status==='full'?'<div style="margin-top:14px"><span class="arrow-link">View Full Unit</span></div>':''}
              ${unit.isAiUnit && unit.keyActivities ? `
              <div style="margin-top:14px;border-top:1px solid var(--border-lt);padding-top:12px">
                <span style="font-size:.65rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#6D28D9;display:block;margin-bottom:8px">Key Activities</span>
                ${unit.keyActivities.map(a=>`<div style="font-size:.78rem;color:var(--txt-2);padding:3px 0;display:flex;gap:8px"><span style="color:#6D28D9;flex-shrink:0">→</span>${a}</div>`).join('')}
              </div>` : ''}
            </div>`).join('')}
        </div>
      </div>
    </section>
  `);
}

/* ── UNIT DETAIL ──────────────────────────────────────── */
function unitDetail(id) {
  let unit=null, grade='';
  for (const lvl of D.units.levels) {
    const u = lvl.units.find(x=>x.id===id);
    if (u) { unit=u; grade=lvl.grade; break; }
  }
  if (!unit||unit.status!=='full') { go('units'); return; }

  const assocLessons = D.demos.lessons.filter(l =>
    (unit.id === 'everyday-accessibility' && ['empathy-interview-lab'].includes(l.id))
  );

  // check if unit has expanded lessons inside weeks
  const hasLessons = unit.weeks && unit.weeks[0] && unit.weeks[0].lessons;

  set(`
    <section class="unit-detail-hero">
      <div class="wrap">
        <div class="breadcrumb">
          <a href="#units">Units</a>
          <span class="breadcrumb-sep">›</span>
          <a href="#grade--${grade.replace(' ','-')}">${grade}</a>
          <span class="breadcrumb-sep">›</span>
          <span>${unit.title}</span>
        </div>
        <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
          <span class="tag tag-grade">${grade}</span>
          <span class="tag tag-full">Full Unit</span>
          <span class="tag">${unit.duration}</span>
        </div>
        <h1 style="margin-bottom:14px">${unit.title}</h1>
        <p style="font-size:1rem;font-style:italic;max-width:520px">"${unit.statementOfInquiry}"</p>
        <div class="unit-meta-strip">
          <div class="meta-chip"><span class="meta-chip-label">Duration</span><span class="meta-chip-value">${unit.duration}</span></div>
          <div class="meta-chip"><span class="meta-chip-label">Global Context</span><span class="meta-chip-value">${unit.globalContext}</span></div>
          <div class="meta-chip"><span class="meta-chip-label">Key Concept</span><span class="meta-chip-value">${unit.keyConcept}</span></div>
          <div class="meta-chip"><span class="meta-chip-label">Related Concepts</span><span class="meta-chip-value">${unit.relatedConcepts.join(', ')}</span></div>
        </div>
      </div>
    </section>

    ${unit.unitOverview ? `
    <section class="sec sec-white">
      <div class="wrap">
        <div class="sec-hdr"><span class="label">Unit Overview</span><h2>What this unit is about</h2></div>
        <p style="max-width:640px;font-size:1rem;line-height:1.8">${unit.unitOverview}</p>
        ${unit.realWorldConnection ? `
        <div style="margin-top:24px;padding:16px 20px;background:var(--accent-lt);border-radius:var(--r-lg);max-width:640px">
          <span class="label" style="margin-bottom:6px">Real-World Connection</span>
          <p style="font-size:.9rem">${unit.realWorldConnection}</p>
        </div>` : ''}
        ${unit.summativeTask ? `
        <div style="margin-top:16px;padding:16px 20px;background:var(--bg-alt);border-radius:var(--r-lg);max-width:640px;border:1px solid var(--border)">
          <span class="label" style="margin-bottom:6px">Summative Task</span>
          <p style="font-size:.9rem">${unit.summativeTask}</p>
        </div>` : ''}
      </div>
    </section>` : ''}

    <section class="sec sec-alt">
      <div class="wrap">
        <div class="sec-hdr"><span class="label">Lines of Inquiry</span><h2>Inquiry Questions</h2></div>
        <div class="inquiry-grid">
          <div class="card card-static inquiry-card"><span class="inquiry-type">Factual</span><p>${unit.inquiryQuestions.factual}</p></div>
          <div class="card card-static inquiry-card"><span class="inquiry-type">Conceptual</span><p>${unit.inquiryQuestions.conceptual}</p></div>
          <div class="card card-static inquiry-card"><span class="inquiry-type">Debatable</span><p>${unit.inquiryQuestions.debatable}</p></div>
        </div>
      </div>
    </section>

    <section class="sec sec-white">
      <div class="wrap">
        <div class="sec-hdr"><span class="label">Lesson Sequence</span><h2>Week-by-Week Flow</h2></div>
        ${unit.weeks.map(w=>`
          <div style="margin-bottom:40px">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-bottom:14px;border-bottom:2px solid var(--accent-lt)">
              <span style="font-family:var(--serif);font-size:1.5rem;color:var(--accent-mid);font-weight:400">W${w.number}</span>
              <div>
                <h3 style="font-family:var(--sans);font-weight:600;font-size:1rem;margin-bottom:2px">${w.title}</h3>
                <p style="font-size:.8rem;color:var(--txt-3);margin:0">${w.focus}</p>
              </div>
            </div>
            <p style="font-size:.9rem;margin-bottom:20px;max-width:600px">${w.desc}</p>
            ${hasLessons && w.lessons ? `
            <div style="display:flex;flex-direction:column;gap:12px">
              ${w.lessons.map(l=>`
                <div class="card card-static" style="padding:20px 24px">
                  <div style="display:flex;align-items:flex-start;gap:16px">
                    <div style="min-width:32px;height:32px;border-radius:50%;background:var(--accent-lt);display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:600;color:var(--accent);flex-shrink:0">${l.number}</div>
                    <div style="flex:1">
                      <h4 style="font-family:var(--sans);font-weight:600;font-size:.95rem;margin-bottom:4px;color:var(--txt-1)">${l.title}</h4>
                      <p style="font-size:.8rem;color:var(--accent);font-weight:500;margin-bottom:8px">Goal: ${l.goal}</p>
                      <p style="font-size:.82rem;margin-bottom:12px">${l.what}</p>
                      <div style="background:var(--bg-alt);border-radius:var(--r);padding:12px 14px;border-left:3px solid var(--accent)">
                        <span style="font-size:.65rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--accent);display:block;margin-bottom:4px">Activity — ${l.activity}</span>
                        <p style="font-size:.8rem;margin:0">${l.activityDetail}</p>
                      </div>
                      <p style="font-size:.78rem;margin-top:10px;color:var(--success);font-weight:500">→ ${l.outcome}</p>
                    </div>
                  </div>
                </div>`).join('')}
            </div>` : ''}
          </div>`).join('')}
      </div>
    </section>

    <section class="sec sec-alt">
      <div class="wrap">
        <div class="two-col">
          <div>
            <span class="label">Assessment Strategy</span>
            <h2 style="margin-bottom:16px">Criteria Overview</h2>
            <div style="display:flex;flex-direction:column;gap:10px">
              ${unit.assessment.map(a=>`
                <div style="display:flex;gap:14px;padding:14px 16px;background:var(--white);border:1px solid var(--border);border-radius:var(--r-lg);align-items:flex-start">
                  <span class="crit-badge" style="flex-shrink:0;margin-top:2px">${a.criterion}</span>
                  <div style="flex:1;min-width:0">
                    <div style="font-size:.85rem;font-weight:500;color:var(--txt-1);margin-bottom:3px">${a.focus}</div>
                    <span class="tag" style="font-size:.68rem">${a.tool}</span>
                    ${a.alignment ? `<div style="font-size:.75rem;color:var(--txt-3);margin-top:6px;line-height:1.55;font-style:italic">${a.alignment}</div>` : ''}
                  </div>
                </div>`).join('')}
            </div>
          </div>
          <div>
            <span class="label">Success Criteria</span>
            <h2 style="margin-bottom:4px">Students will be able to</h2>
            <div class="check-list" style="margin-top:18px">
              ${unit.successCriteria.map(s=>`<div class="check-item">${s}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    ${unit.assessment[0].rubric ? `
    <section class="sec sec-white">
      <div class="wrap">
        <div class="sec-hdr">
          <span class="label">Assessment Rubric</span>
          <h2>How learning is assessed — criterion by criterion</h2>
          <p>Each stage of this unit maps directly to an MYP criterion. Assessment is not separate from learning — it is embedded within the process.</p>
        </div>
        ${unit.assessment.map(a=>`
          <div style="margin-bottom:32px">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
              <span class="crit-badge">${a.criterion}</span>
              <div>
                <h3 style="font-family:var(--sans);font-weight:600;font-size:.95rem;margin-bottom:2px">Criterion ${a.criterion} — ${a.focus}</h3>
                ${a.linkedLessons ? `<p style="font-size:.75rem;color:var(--accent);margin:0">${a.linkedLessons.join(' · ')}</p>` : ''}
              </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px">
              ${a.rubric.map(r=>`
                <div style="padding:14px 16px;border-radius:var(--r-lg);border:1.5px solid var(--border);background:var(--white)">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                    <span style="font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:20px;background:${r.band==='7–8'?'var(--accent-lt)':r.band==='5–6'?'#E6F4ED':r.band==='3–4'?'#FFF4E6':'#FDE8E8'};color:${r.band==='7–8'?'var(--accent)':r.band==='5–6'?'#1A7F5A':r.band==='3–4'?'#B45309':'#C0392B'}">${r.band}</span>
                    <span style="font-size:.75rem;font-weight:600;color:var(--txt-2)">${r.label}</span>
                  </div>
                  <p style="font-size:.78rem;line-height:1.55">${r.desc}</p>
                </div>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </section>` : ''}

    <section class="sec sec-alt">
      <div class="wrap">
        <div class="sec-hdr"><span class="label">Differentiation</span><h2>Supporting all learners</h2></div>
        <div class="check-list">
          ${unit.differentiation.map(d=>`<div class="check-item">${d}</div>`).join('')}
        </div>
        <div style="margin-top:20px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          <span class="label" style="margin:0">ATL Skills</span>
          ${unit.atlSkills.map(s=>`<span class="tag">${s}</span>`).join('')}
        </div>
      </div>
    </section>

    ${assocLessons.length ? `
    <section class="sec sec-white">
      <div class="wrap">
        <div class="sec-hdr">
          <span class="label">Associated Lessons</span>
          <h2>Demo lessons linked to this unit</h2>
        </div>
        <div class="assoc-list">
          ${assocLessons.map(l=>`
            <div class="assoc-item" onclick="go('lesson--${l.id}')">
              <div class="assoc-item-left">
                <h4>${l.title}</h4>
                <span>${l.duration} · ${l.grade} · ${l.phase}</span>
              </div>
              <span class="arr">→</span>
            </div>`).join('')}
        </div>
      </div>
    </section>` : ''}
  `);
}

/* ── DEMOS — with filter chips ────────────────────────── */
function demos(filterGrade = 'All') {
  const dm = D.demos;
  const grades = ['All', 'MYP 1', 'MYP 2', 'MYP 3', 'MYP 4', 'MYP 5'];
  const filtered = filterGrade==='All' ? dm.lessons : dm.lessons.filter(l=>l.grade===filterGrade);

  set(`
    <section class="hero" style="padding:80px 0 60px">
      <div class="wrap">
        <span class="label">Educational Pedagogy</span>
        <h1>Teaching Design<br><span class="accent">in Action</span></h1>
        <div class="divider"></div>
        <p style="max-width:540px">${dm.intro}</p>
      </div>
    </section>

    <section class="sec sec-white">
      <div class="wrap">
        <div class="sec-hdr">
          <span class="label">Inside a Lesson</span>
          <h2>How every lesson is structured</h2>
        </div>
        <div class="ls-grid">
          ${dm.lessonStructure.map(s=>`
            <div class="card card-static ls-step">
              <span class="ls-num">${s.step}</span>
              <h3>${s.title}</h3>
              <p>${s.desc}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="sec sec-alt">
      <div class="wrap-wide">
        <div class="sec-hdr wrap">
          <span class="label">Demo Lessons</span>
          <h2>All prepared lessons</h2>
        </div>
        <div class="wrap-wide">
          <div class="chip-row" id="demoFilters">
            ${grades.map(g=>`
              <button class="chip ${g===filterGrade?'active':''}" onclick="demos('${g}')">${g}</button>
            `).join('')}
          </div>
          <div class="lessons-grid">
            ${filtered.map(l=>`
              <div class="card card-click" style="padding:0;overflow:hidden" onclick="go('lesson--${l.id}')">
                <div class="lesson-card-head">
                  <span class="tag tag-phase phase-${l.phase.toLowerCase()}">${l.phase}</span>
                  <h3 style="margin-top:10px">${l.title}</h3>
                  <p>${l.objective}</p>
                  <div class="lesson-card-meta">
                    <span class="tag">${l.grade}</span>
                    <span class="tag tag-accent">${l.duration}</span>
                    ${l.criteria.map(c=>`<span class="tag">Criterion ${c}</span>`).join('')}
                  </div>
                </div>
                <div class="lesson-card-body">
                  <span class="arrow-link">View Full Lesson</span>
                </div>
              </div>`).join('')}
          </div>
          ${filtered.length===0?`<p style="color:var(--txt-3);text-align:center;padding:40px 0">No lessons yet for ${filterGrade}. Check back soon.</p>`:''}
        </div>
      </div>
    </section>

    <section class="sec sec-white">
      <div class="wrap">
        <div style="max-width:500px">
          <span class="label">What Students Would Develop</span>
          <h2>Skills that extend beyond the classroom</h2>
          <div class="check-list" style="margin-top:20px">
            ${['Empathy-driven thinking — putting the user at the centre of every decision',
               'Problem identification and framing — defining a solvable design challenge from a messy situation',
               'Iterative design mindset — understanding that failure is a data point, not an endpoint',
               'Reflective learning practices — documenting growth and thinking about their own thinking',
               'Communication and collaboration skills — articulating ideas and working across perspectives'
              ].map(s=>`<div class="check-item">${s}</div>`).join('')}
          </div>
        </div>
      </div>
    </section>
  `);
}

/* ── LESSON DETAIL ────────────────────────────────────── */
function lessonDetail(id) {
  const lesson = D.demos.lessons.find(l=>l.id===id);
  if (!lesson) { go('demos'); return; }

  // find parent unit
  let parentUnit = null, parentGrade = '';
  for (const lvl of D.units.levels) {
    for (const u of lvl.units) {
      if (u.id==='everyday-accessibility' && id==='empathy-interview-lab') {
        parentUnit=u; parentGrade=lvl.grade; break;
      }
    }
  }

  set(`
    <section class="unit-detail-hero">
      <div class="wrap">
        <div class="breadcrumb">
          <a href="#demos">Demo Lessons</a>
          <span class="breadcrumb-sep">›</span>
          <span>${lesson.title}</span>
        </div>
        <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
          <span class="tag">${lesson.grade}</span>
          <span class="tag tag-phase phase-${lesson.phase.toLowerCase()}">${lesson.phase}</span>
          <span class="tag tag-accent">${lesson.duration}</span>
          ${lesson.criteria.map(c=>`<span class="tag">Criterion ${c}</span>`).join('')}
        </div>
        <h1 style="margin-bottom:14px">${lesson.title}</h1>
        <p style="max-width:520px;font-size:1rem">${lesson.objective}</p>
        ${parentUnit ? `
        <div style="margin-top:20px;padding:14px 18px;background:var(--accent-lt);border-radius:var(--r-lg);display:inline-flex;align-items:center;gap:10px;cursor:pointer" onclick="go('unit--${parentUnit.id}')">
          <span style="font-size:.72rem;font-weight:500;color:var(--accent);text-transform:uppercase;letter-spacing:.08em">Part of Unit</span>
          <span style="font-size:.875rem;font-weight:500;color:var(--txt-1)">${parentUnit.title}</span>
          <span style="color:var(--accent)">→</span>
        </div>` : ''}
      </div>
    </section>

    <section class="sec sec-alt">
      <div class="wrap">
        <div class="sec-hdr"><span class="label">Activity Flow</span><h2>Step-by-Step</h2></div>
        <div class="card card-static" style="padding:32px">
          <div class="lesson-steps">
            ${lesson.steps.map(s=>`
              <div class="lesson-step">
                <span class="step-n">${s.num}</span>
                <p style="margin-top:4px">${s.desc}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <section class="sec sec-white">
      <div class="wrap">
        <div class="two-col">
          <div>
            <span class="label">Expected Outcomes</span>
            <h2 style="margin-bottom:16px">What students would gain</h2>
            <div class="outcomes-row" style="flex-direction:column;align-items:flex-start">
              ${lesson.outcomes.map(o=>`<span class="outcome-chip">${o}</span>`).join('')}
            </div>
          </div>
          <div>
            <span class="label">IB Alignment</span>
            <h2 style="margin-bottom:16px">Criteria covered</h2>
            <div class="check-list">
              ${lesson.criteria.map(c=>{
                const labels={A:'Inquiring & Analysing',B:'Developing Ideas',C:'Creating the Solution',D:'Evaluating'};
                return `<div class="check-item"><strong>Criterion ${c}</strong> — ${labels[c]||''}</div>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="sec sec-alt">
      <div class="wrap" style="text-align:center">
        <h2 style="margin-bottom:16px">Want to see the full unit this lesson belongs to?</h2>
        <div class="btn-group" style="justify-content:center">
          <a href="#units" class="btn btn-primary">Browse All Units</a>
          <a href="#demos" class="btn btn-outline">Back to All Lessons</a>
        </div>
      </div>
    </section>
  `);
}

/* ── CONTACT ──────────────────────────────────────────── */
function contact() {
  const fid = D.site.formspreeId;
  set(`
    <section class="sec sec-white" style="min-height:80vh;padding-top:80px">
      <div class="wrap">
        <div class="contact-inner">
          <span class="label">Get in Touch</span>
          <h1>Let's connect</h1>
          <div class="divider"></div>
          <p style="margin-bottom:6px">I am actively seeking IB MYP Design teaching positions and welcome conversations with IB Coordinators, HR teams, and school leaders.</p>
          <p>I am happy to conduct a demo lesson or share additional unit plans on request.</p>
          <form class="contact-form" id="contactForm" action="https://formspree.io/f/${fid}" method="POST">
            <div class="form-group">
              <label for="cf-name">Your Name</label>
              <input type="text" id="cf-name" name="name" placeholder="e.g. Ms Priya Sharma" required>
            </div>
            <div class="form-group">
              <label for="cf-org">School / Organisation</label>
              <input type="text" id="cf-org" name="organisation" placeholder="e.g. Inventure Academy, Bangalore">
            </div>
            <div class="form-group">
              <label for="cf-email">Your Email</label>
              <input type="email" id="cf-email" name="email" placeholder="your@school.edu" required>
            </div>
            <div class="form-group">
              <label for="cf-msg">Message</label>
              <textarea id="cf-msg" name="message" placeholder="Tell me about the position, or anything else you'd like to discuss..." required></textarea>
            </div>
            <div id="formMsg" class="form-msg"></div>
            <button type="submit" class="btn btn-primary" id="formSubmit" style="min-width:0;align-self:flex-start">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  `);

  document.getElementById('contactForm').addEventListener('submit', async e => {
    e.preventDefault();
    const btn=document.getElementById('formSubmit');
    const msg=document.getElementById('formMsg');
    btn.textContent='Sending…'; btn.disabled=true;
    msg.className='form-msg'; msg.style.display='none';
    if (fid==='YOUR_FORMSPREE_ID') {
      setTimeout(()=>{ msg.className='form-msg success'; msg.textContent='✓ Demo mode — connect Formspree to receive real emails.'; msg.style.display='block'; btn.textContent='Send Message'; btn.disabled=false; e.target.reset(); },800);
      return;
    }
    try {
      const resp = await fetch(e.target.action,{method:'POST',body:new FormData(e.target),headers:{Accept:'application/json'}});
      if (resp.ok) { msg.className='form-msg success'; msg.textContent='✓ Thank you! I will get back to you soon.'; e.target.reset(); }
      else throw new Error();
    } catch { msg.className='form-msg error'; msg.textContent='Something went wrong. Please try again.'; }
    msg.style.display='block'; btn.textContent='Send Message'; btn.disabled=false;
  });
}

/* ── Helper ───────────────────────────────────────────── */
function set(html) { document.getElementById('main').innerHTML = html; }

/* ── Init ─────────────────────────────────────────────── */
boot();
