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
  const hash = location.hash.replace('#', '') || 'home';
  const main = document.getElementById('main');
  main.innerHTML = '';
  window.scrollTo(0, 0);
  closeMenu();
  setActive(hash);

  const map = { home, about, philosophy, units, demos, contact };

  if (hash.startsWith('unit--')) {
    unitDetail(hash.replace('unit--', ''));
  } else {
    (map[hash] || home)();
  }
}

function go(page) {
  location.hash = page;
}

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
      <a href="#about">About</a>
      <a href="#philosophy">Philosophy</a>
      <a href="#units">Units</a>
      <a href="#demos">Demo Lessons</a>
      <a href="#contact">Get in Touch</a>
    </div>`;
  document.getElementById('burgerBtn').addEventListener('click', () =>
    document.getElementById('mobileNav').classList.toggle('open'));
}
function closeMenu() { document.getElementById('mobileNav')?.classList.remove('open'); }
function setActive(page) {
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const p = a.getAttribute('href').replace('#', '');
    a.classList.toggle('active', p === page || (page.startsWith('unit--') && p === 'units'));
  });
}

/* ── HOME ─────────────────────────────────────────────── */
function home() {
  const h = D.home;
  set(`
    <!-- Hero -->
    <section class="hero">
      <div class="wrap">
        <div class="hero-eyebrow">${D.site.role} — Teaching Portfolio</div>
        <h1>${h.headline}<br><span class="accent">${h.headlineAccent}</span></h1>
        <p class="hero-sub">${h.subline}</p>
        <div class="hero-btns">
          <a href="#units"     class="btn btn-primary">Explore Unit Plans</a>
          <a href="#philosophy" class="btn btn-outline">Teaching Philosophy</a>
        </div>
        <div class="hero-stats">
          <div class="stat-item"><span class="stat-label">Education</span><span class="stat-value">M.Des — IDC, IIT Bombay</span></div>
          <div class="stat-item"><span class="stat-label">Current Role</span><span class="stat-value">UX Designer, Ideaforge Technology</span></div>
          <div class="stat-item"><span class="stat-label">Focus</span><span class="stat-value">IB MYP Design — Years 1–5</span></div>
          <div class="stat-item"><span class="stat-label">Location</span><span class="stat-value">Bangalore, India</span></div>
        </div>
      </div>
    </section>

    <!-- Approach pillars -->
    <section class="sec sec-alt">
      <div class="wrap-wide">
        <div class="sec-hdr wrap">
          <span class="label">My Approach to Classroom Learning</span>
          <h2>Four principles that guide my teaching</h2>
        </div>
        <div class="wrap-wide">
          <div class="pillars">
            ${h.pillars.map((p,i)=>`
              <div class="pillar">
                <div class="pillar-icon">${['🔍','💡','🎯','🤝'][i]}</div>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- MYP Design Cycle -->
    <section class="sec sec-white">
      <div class="wrap">
        <div class="sec-hdr">
          <span class="label">Framework Understanding</span>
          <h2>The IB MYP Design Cycle</h2>
          <p>Students are assessed not only on what they produce, but on how they think, plan, and reflect throughout every stage.</p>
        </div>
        <div class="inquiry-grid">
          ${[
            {c:'Criterion A', t:'Inquiring & Analysing', d:'Identifying the problem, researching existing solutions, and defining a clear design brief. Emphasis on asking the right questions before attempting any solution.'},
            {c:'Criterion B', t:'Developing Ideas',      d:'Generating multiple design concepts, evaluating against specifications, and justifying a chosen direction through annotated sketches and reasoning.'},
            {c:'Criterion C', t:'Creating the Solution', d:'Constructing the solution, demonstrating technical skill and following a plan — adapting thoughtfully when the process reveals new constraints.'},
            {c:'Criterion D', t:'Evaluating',            d:'Testing the solution against the design brief, reflecting honestly on its effectiveness, and identifying specific, meaningful improvements.'},
          ].map(x=>`
            <div class="inquiry-card">
              <span class="inquiry-type">${x.c}</span>
              <h3 style="font-size:.9rem;font-family:var(--sans);font-weight:500;margin-bottom:8px">${x.t}</h3>
              <p style="font-size:.82rem;font-style:normal">${x.d}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- Lessons preview -->
    <section class="sec sec-alt">
      <div class="wrap-wide">
        <div class="sec-hdr wrap">
          <span class="label">Classroom in Action</span>
          <h2>Featured Demo Lessons</h2>
          <p>Practical applications of the MYP Design Cycle — ready for the classroom.</p>
        </div>
        <div class="wrap-wide">
          <div class="lesson-previews">
            ${h.lessonHighlights.map(l=>`
              <div class="lesson-preview" onclick="go('demos')">
                <div class="lesson-preview-meta">
                  <span class="duration-tag">${l.duration}</span>
                </div>
                <h3>${l.title}</h3>
                <p>${l.desc}</p>
                <span class="arrow-link">View Lesson</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="sec sec-white">
      <div class="wrap">
        <div style="max-width:500px">
          <span class="label">Open to Opportunities</span>
          <h2>Looking for IB MYP Design teaching positions</h2>
          <p style="margin:16px 0 28px">I am actively seeking IB MYP Design roles and am prepared to conduct a demo lesson or share additional unit plans on request.</p>
          <a href="#contact" class="btn btn-primary">Get in Touch</a>
        </div>
      </div>
    </section>
  `);
}

/* ── ABOUT ────────────────────────────────────────────── */
function about() {
  const a = D.about;
  set(`
    <section class="about-hero">
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
              <div class="edu-card">
                <h3>${e.degree}</h3>
                <div class="inst">${e.institution}</div>
                ${e.detail ? `<p>${e.detail}</p>` : ''}
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
          <p>My UX background is not separate from my teaching — it is the source of it. The same structured thinking I practise at work maps directly to the MYP Design cycle.</p>
        </div>
        <div class="exp-card">
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
        <div class="pillar-cards">
          ${p.pillars.map(pl=>`
            <div class="pillar-card">
              <span class="pillar-num">${pl.number}</span>
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
          <thead>
            <tr>
              <th>Industry Practice</th>
              <th class="trans-arrow"></th>
              <th>Classroom Application</th>
            </tr>
          </thead>
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

/* ── UNITS ────────────────────────────────────────────── */
function units() {
  const u = D.units;
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
        <div class="wrap progression">
          ${u.progressionSteps.map(s=>`
            <div class="prog-step">
              <span class="prog-step-label">${s.label}</span>
              <span class="prog-step-sub">${s.sub}</span>
            </div>`).join('')}
        </div>

        ${u.levels.map(lvl=>`
          <div class="grade-block">
            <div class="grade-label">
              <span class="grade-badge">${lvl.grade}</span>
              <span class="grade-theme">${lvl.theme}</span>
            </div>
            <div class="units-grid">
              ${lvl.units.map(unit=>`
                <div class="unit-card ${unit.status}"
                     onclick="${unit.status==='full'?`go('unit--${unit.id}')`:''}"
                     style="${unit.status!=='full'?'cursor:default':''}">
                  <div class="unit-card-top">
                    <span class="tag tag-accent">${unit.grade}</span>
                    ${unit.status==='full'?'<span class="full-badge">Full Unit</span>':'<span class="meta-pill">Outline</span>'}
                    <span class="meta-pill">${unit.duration}</span>
                  </div>
                  <h3>${unit.title}</h3>
                  <p>${unit.desc}</p>
                  <div class="unit-card-meta">
                    <span class="meta-pill">${unit.focus}</span>
                    ${unit.criteria.map(c=>`<span class="meta-pill">Crit. ${c}</span>`).join('')}
                  </div>
                  ${unit.status==='full'?'<div style="margin-top:16px"><span class="arrow-link">View Full Unit</span></div>':''}
                </div>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </section>
  `);
}

/* ── UNIT DETAIL ──────────────────────────────────────── */
function unitDetail(id) {
  // find unit across all levels
  let unit = null;
  for (const lvl of D.units.levels) {
    unit = lvl.units.find(u => u.id === id);
    if (unit) break;
  }
  if (!unit || unit.status !== 'full') { go('units'); return; }

  set(`
    <section class="unit-detail-hero">
      <div class="wrap">
        <a href="#units" class="back-btn">Back to Units</a>
        <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
          <span class="tag tag-accent">${unit.grade}</span>
          <span class="full-badge">Full Unit</span>
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

    <section class="sec sec-white">
      <div class="wrap">
        <div class="sec-hdr">
          <span class="label">Inquiry Questions</span>
          <h2>Lines of Inquiry</h2>
        </div>
        <div class="inquiry-grid">
          <div class="inquiry-card"><span class="inquiry-type">Factual</span><p>${unit.inquiryQuestions.factual}</p></div>
          <div class="inquiry-card"><span class="inquiry-type">Conceptual</span><p>${unit.inquiryQuestions.conceptual}</p></div>
          <div class="inquiry-card"><span class="inquiry-type">Debatable</span><p>${unit.inquiryQuestions.debatable}</p></div>
        </div>
      </div>
    </section>

    <section class="sec sec-alt">
      <div class="wrap">
        <div class="sec-hdr">
          <span class="label">Learning Process</span>
          <h2>Week-by-Week Progression</h2>
        </div>
        <div class="weeks-grid">
          ${unit.weeks.map(w=>`
            <div class="week-card">
              <span class="week-num">Week ${w.number}</span>
              <h3>${w.title}</h3>
              <p>${w.desc}</p>
              <div class="week-focus">Focus: ${w.focus}</div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="sec sec-white">
      <div class="wrap">
        <div class="two-col">
          <div>
            <span class="label">Assessment Strategy</span>
            <h2 style="margin-bottom:4px">Criteria Overview</h2>
            <table class="crit-table">
              <thead><tr><th>Criterion</th><th>Focus</th><th>Tool</th></tr></thead>
              <tbody>
                ${unit.assessment.map(a=>`
                  <tr>
                    <td><span class="crit-badge">${a.criterion}</span></td>
                    <td>${a.focus}</td>
                    <td><span class="meta-pill">${a.tool}</span></td>
                  </tr>`).join('')}
              </tbody>
            </table>
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

    <section class="sec sec-alt">
      <div class="wrap">
        <span class="label">Differentiation</span>
        <h2 style="margin-bottom:16px">Supporting all learners</h2>
        <div class="check-list">
          ${unit.differentiation.map(d=>`<div class="check-item">${d}</div>`).join('')}
        </div>
        <div style="margin-top:24px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          <span class="label" style="margin:0">ATL Skills</span>
          ${unit.atlSkills.map(s=>`<span class="tag">${s}</span>`).join('')}
        </div>
      </div>
    </section>
  `);
}

/* ── DEMO LESSONS ─────────────────────────────────────── */
function demos() {
  const dm = D.demos;
  const phaseClass = { inquiring:'phase-inquiring', developing:'phase-developing', creating:'phase-creating', evaluating:'phase-evaluating' };

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
          <p>Each lesson balances structure with creative freedom — ensuring students remain engaged while developing critical thinking skills.</p>
        </div>
        <div class="lesson-structure">
          ${dm.lessonStructure.map(s=>`
            <div class="ls-step">
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
          <span class="label">Featured Demo Lessons</span>
          <h2>Practical applications of the MYP Design Cycle</h2>
        </div>
        <div class="wrap-wide">
          <div class="lessons-grid">
            ${dm.lessons.map(l=>`
              <div class="lesson-card">
                <div class="lesson-card-head">
                  <span class="lesson-card-phase ${phaseClass[l.phase.toLowerCase()]}">${l.phase}</span>
                  <h3>${l.title}</h3>
                  <p>${l.objective}</p>
                  <div class="lesson-card-meta">
                    <span class="tag">${l.grade}</span>
                    <span class="tag tag-accent">${l.duration}</span>
                    ${l.criteria.map(c=>`<span class="tag">Criterion ${c}</span>`).join('')}
                  </div>
                </div>
                <div class="lesson-card-body">
                  <span class="label">Activity Flow</span>
                  <div class="lesson-steps">
                    ${l.steps.map(s=>`
                      <div class="lesson-step">
                        <span class="step-n">${s.num}</span>
                        <p>${s.desc}</p>
                      </div>`).join('')}
                  </div>
                  <div style="margin-top:20px">
                    <span class="label">Expected Outcomes</span>
                    <div class="outcomes-row">
                      ${l.outcomes.map(o=>`<span class="outcome-chip">${o}</span>`).join('')}
                    </div>
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <section class="sec sec-white">
      <div class="wrap">
        <div style="max-width:500px">
          <span class="label">What Students Develop</span>
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

/* ── CONTACT ──────────────────────────────────────────── */
function contact() {
  const fid = D.site.formspreeId;
  set(`
    <section class="contact-sec">
      <div class="wrap">
        <div class="contact-inner">
          <span class="label">Get in Touch</span>
          <h1>Let's connect</h1>
          <div class="divider"></div>
          <p style="margin-bottom:6px">I am actively seeking IB MYP Design teaching positions and welcome conversations with IB Coordinators, HR teams, and school leaders.</p>
          <p>I am happy to conduct a demo lesson or share additional unit plans on request. Please use the form below and I will get back to you promptly.</p>

          <form class="contact-form" id="contactForm"
                action="https://formspree.io/f/${fid}"
                method="POST">
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
            <button type="submit" class="btn btn-primary form-submit" id="formSubmit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  `);

  document.getElementById('contactForm').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('formSubmit');
    const msg = document.getElementById('formMsg');
    btn.textContent = 'Sending…'; btn.disabled = true;
    msg.className = 'form-msg'; msg.style.display = 'none';

    if (fid === 'YOUR_FORMSPREE_ID') {
      // Demo mode — just show success
      setTimeout(()=>{
        msg.className='form-msg success'; msg.textContent='✓ Thank you! Your message has been received. (Demo mode — connect Formspree to receive real emails.)'; msg.style.display='block';
        btn.textContent='Sent'; btn.disabled=false; e.target.reset();
      },800);
      return;
    }

    try {
      const resp = await fetch(e.target.action, {
        method:'POST', body: new FormData(e.target),
        headers: { Accept:'application/json' }
      });
      if (resp.ok) {
        msg.className='form-msg success'; msg.textContent='✓ Thank you! Your message has been received. I will get back to you soon.';
        e.target.reset();
      } else {
        throw new Error();
      }
    } catch {
      msg.className='form-msg error'; msg.textContent='Something went wrong. Please try emailing me directly.';
    }
    msg.style.display='block'; btn.textContent='Send Message'; btn.disabled=false;
  });
}

/* ── Helper ───────────────────────────────────────────── */
function set(html) { document.getElementById('main').innerHTML = html; }

/* ── Init ─────────────────────────────────────────────── */
boot();
