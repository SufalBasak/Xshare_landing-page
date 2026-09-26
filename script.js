/**
 * XShare Landing Page - Interactive Scripts
 * Handles animations, modals, filters, ATS resume preview, mock test quiz, and tickers.
 */

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.xshare.learnshare';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animations with IntersectionObserver
    initScrollReveal();

    // 2. Navbar Sticky & Scroll Top Button
    initNavbarAndScrollTop();

    // 3. Mobile Navigation Drawer
    initMobileDrawer();

    // 4. Hero Search & Trending Chips
    initHeroSearch();

    // 5. Hero Interactive Preview Card Interactions
    initHeroCardInteractions();

    // 6. Stats Animated Counter Ticker
    initStatsCounter();

    // 7. Feature Category Filter Tabs
    initFeatureFilters();

    // 8. Experience Archive Company & Role Filters
    initExperienceFilters();

    // 9. Interactive ATS Resume Scorer Widget
    initAtsResumeScorer();

    // 10. Live Mock Test Quiz Widget
    initMockQuiz();

    // 11. Full Experience Reader Modal
    initExperienceReaderModal();

    // 12. App Download Modal (QR Code)
    initAppModals();

    // 13. FAQ Accordion Toggle
    initFaqAccordion();

    // 14. Keyboard Shortcuts (Cmd/Ctrl + K)
    initKeyboardShortcuts();

    // 15. Video Sound Controller & Autoplay Policy Handler
    initVideoSound();
});

/* ==========================================================================
   1. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   2. Navbar Sticky & Scroll Top Button
   ========================================================================== */
function initNavbarAndScrollTop() {
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const drawerNavLinks = document.querySelectorAll('.drawer-nav-link');
    const btnGetAppDrawer = document.getElementById('btn-get-app-drawer');

    function openDrawer() {
        mobileDrawer.classList.add('open');
        drawerBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('open');
        drawerBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    drawerNavLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    if (btnGetAppDrawer) {
        btnGetAppDrawer.addEventListener('click', (e) => {
            closeDrawer();
            window.open(PLAY_STORE_URL, '_blank');
        });
    }
}

/* ==========================================================================
   4. Hero Search & Trending Chips
   ========================================================================== */
function initHeroSearch() {
    const searchInput = document.getElementById('hero-search-input');
    const searchSubmit = document.getElementById('hero-search-submit');
    const searchClear = document.getElementById('hero-search-clear');
    const tagChips = document.querySelectorAll('.tag-chip');

    function performSearch(query) {
        if (!query.trim()) {
            showToast('Please enter a company, role, or topic to explore!');
            return;
        }
        showToast(`Searching experiences for "${query}"...`);
        // Scroll to experiences section and set filter if matched
        const expSection = document.getElementById('experiences');
        if (expSection) {
            expSection.scrollIntoView({ behavior: 'smooth' });
        }

        const lower = query.toLowerCase();
        const compFilter = document.getElementById('company-filter');
        if (compFilter) {
            if (lower.includes('microsoft')) compFilter.value = 'microsoft';
            else if (lower.includes('google')) compFilter.value = 'google';
            else if (lower.includes('adobe')) compFilter.value = 'adobe';
            else if (lower.includes('zomato')) compFilter.value = 'zomato';
            else if (lower.includes('amazon')) compFilter.value = 'amazon';
            
            // Trigger change event
            compFilter.dispatchEvent(new Event('change'));
        }
    }

    if (searchSubmit && searchInput) {
        searchSubmit.addEventListener('click', () => {
            performSearch(searchInput.value);
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });

        searchInput.addEventListener('input', () => {
            if (searchClear) {
                searchClear.style.display = searchInput.value.length > 0 ? 'block' : 'none';
            }
        });
    }

    if (searchClear && searchInput) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchClear.style.display = 'none';
            searchInput.focus();
        });
    }

    tagChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-search') || chip.textContent;
            if (searchInput) {
                searchInput.value = query;
                if (searchClear) searchClear.style.display = 'block';
            }
            performSearch(query);
        });
    });
}

/* ==========================================================================
   5. Hero Interactive Preview Card Interactions
   ========================================================================== */
function initHeroCardInteractions() {
    const btnLike = document.getElementById('btn-like-hero');
    const likeCountSpan = document.getElementById('hero-like-count');
    const btnBookmark = document.getElementById('btn-bookmark-hero');
    const btnSampleModal = document.getElementById('btn-view-sample-modal');
    const btnBuildProfile = document.getElementById('btn-build-profile');

    let liked = false;
    let likes = 1420;

    if (btnLike) {
        btnLike.addEventListener('click', () => {
            liked = !liked;
            btnLike.classList.toggle('liked', liked);
            likes += liked ? 1 : -1;
            if (likeCountSpan) {
                likeCountSpan.textContent = (likes / 1000).toFixed(1) + 'K';
            }
            showToast(liked ? 'Upvoted Google L4 Experience!' : 'Upvote removed');
        });
    }

    if (btnBookmark) {
        btnBookmark.addEventListener('click', () => {
            const icon = btnBookmark.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.replace('fa-regular', 'fa-solid');
                btnBookmark.style.color = '#fbbf24';
                showToast('Saved to your preparation bookmarks!');
            } else {
                icon.classList.replace('fa-solid', 'fa-regular');
                btnBookmark.style.color = '';
                showToast('Removed from bookmarks');
            }
        });
    }

    if (btnSampleModal) {
        btnSampleModal.addEventListener('click', () => {
            openExperienceReader('google-1');
        });
    }

    if (btnBuildProfile) {
        btnBuildProfile.addEventListener('click', (e) => {
            window.open(PLAY_STORE_URL, '_blank');
        });
    }
}

/* ==========================================================================
   6. Stats Animated Counter Ticker
   ========================================================================== */
function initStatsCounter() {
    const statCards = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statCards.forEach(card => {
                    const target = parseInt(card.getAttribute('data-target'), 10);
                    animateCounter(card, target, 2000);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);

    function animateCounter(element, target, duration) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic function
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOutProgress * target);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }
}

/* ==========================================================================
   7. Feature Category Filter Tabs
   ========================================================================== */
function initFeatureFilters() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.feature-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

/* ==========================================================================
   8. Experience Archive Company & Role Filters
   ========================================================================== */
function initExperienceFilters() {
    const companyFilter = document.getElementById('company-filter');
    const roleFilter = document.getElementById('role-filter');
    const expCards = document.querySelectorAll('.exp-card');

    function applyFilters() {
        const selectedCompany = companyFilter ? companyFilter.value : 'all';
        const selectedRole = roleFilter ? roleFilter.value : 'all';

        expCards.forEach(card => {
            const company = card.getAttribute('data-company');
            const role = card.getAttribute('data-role');

            const matchCompany = (selectedCompany === 'all' || company === selectedCompany);
            const matchRole = (selectedRole === 'all' || role === selectedRole);

            if (matchCompany && matchRole) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (companyFilter) companyFilter.addEventListener('change', applyFilters);
    if (roleFilter) roleFilter.addEventListener('change', applyFilters);
}

/* ==========================================================================
   9. Interactive ATS Resume Scorer Widget
   ========================================================================== */
function initAtsResumeScorer() {
    const rolePills = document.querySelectorAll('.role-pill');
    const scoreNum = document.getElementById('ats-score-num');
    const resumeBox = document.getElementById('sample-resume-box');
    const btnOpenResumeBuilder = document.getElementById('btn-open-resume-builder');
    const btnDemoResume = document.getElementById('btn-demo-resume');

    const resumeData = {
        sde: {
            score: '96%',
            target: 'Senior Software Engineer @ Tier-1 Tech',
            b1: 'Quantified impact: "Reduced API p99 latency from 450ms to 65ms using Redis caching & Go concurrency"',
            b2: 'Keywords matched: Distributed Systems, Kafka, Go, Docker, Microservices, CI/CD',
            b3: 'ATS Layout: Recruiter-approved single column with semantic hierarchy',
            tip: 'Tip: Add 2 cloud infrastructure keywords (AWS EKS / Terraform) for 99% score'
        },
        ml: {
            score: '92%',
            target: 'Applied AI / ML Engineer @ Tech Unicorn',
            b1: 'Quantified impact: "Fine-tuned Llama-3 8B with LoRA, achieving 28% higher task accuracy and 3x throughput"',
            b2: 'Keywords matched: PyTorch, HuggingFace, CUDA, Vector DBs, RAG Architecture, ONNX',
            b3: 'ATS Layout: Standard single-column format with publication links',
            tip: 'Tip: Add MLOps deployment pipeline experience (Kubeflow / MLflow)'
        },
        pm: {
            score: '94%',
            target: 'Product Manager (Core Platform) @ Consumer Tech',
            b1: 'Quantified impact: "Spearheaded user onboarding revamp leading to +18% 30-day user retention"',
            b2: 'Keywords matched: A/B Testing, PRD, SQL Analytics, Roadmapping, User Research, OKRs',
            b3: 'ATS Layout: Clean chronological format highlighting business revenue metrics',
            tip: 'Tip: Highlight cross-functional leadership and engineering sync methodologies'
        }
    };

    rolePills.forEach(pill => {
        pill.addEventListener('click', () => {
            rolePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const roleKey = pill.getAttribute('data-role-sample');
            const data = resumeData[roleKey];

            if (data && resumeBox && scoreNum) {
                scoreNum.textContent = data.score;
                resumeBox.innerHTML = `
                    <div class="resume-line"><strong>Target Role:</strong> ${data.target}</div>
                    <div class="resume-bullet passed"><i class="fa-solid fa-check"></i> ${data.b1}</div>
                    <div class="resume-bullet passed"><i class="fa-solid fa-check"></i> ${data.b2}</div>
                    <div class="resume-bullet passed"><i class="fa-solid fa-check"></i> ${data.b3}</div>
                    <div class="resume-bullet warning"><i class="fa-solid fa-circle-info"></i> ${data.tip}</div>
                `;
            }
        });
    });

    function triggerResumeAction() {
        showToast('Opening ATS Resume Builder on Google Play...');
        window.open(PLAY_STORE_URL, '_blank');
    }

    if (btnOpenResumeBuilder) btnOpenResumeBuilder.addEventListener('click', triggerResumeAction);
    if (btnDemoResume) btnDemoResume.addEventListener('click', triggerResumeAction);
}

/* ==========================================================================
   10. Live Mock Test Quiz Widget
   ========================================================================== */
function initMockQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option-btn');
    const feedbackMsg = document.getElementById('quiz-feedback');
    const timerElement = document.getElementById('mock-timer');
    const btnMoreMocks = document.getElementById('btn-more-mocks');
    const btnDemoMock = document.getElementById('btn-demo-mock');

    let answered = false;
    let timeLeft = 45;

    // Timer countdown
    const timerInterval = setInterval(() => {
        if (timeLeft > 0 && !answered) {
            timeLeft--;
            const formatted = timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`;
            if (timerElement) {
                timerElement.innerHTML = `<i class="fa-regular fa-clock"></i> ${formatted}`;
            }
        }
    }, 1000);

    quizOptions.forEach(optBtn => {
        optBtn.addEventListener('click', () => {
            if (answered) return;
            answered = true;

            const isCorrect = optBtn.getAttribute('data-correct') === 'true';

            quizOptions.forEach(b => {
                if (b.getAttribute('data-correct') === 'true') {
                    b.classList.add('correct');
                }
            });

            if (isCorrect) {
                optBtn.classList.add('correct');
                if (feedbackMsg) {
                    feedbackMsg.className = 'quiz-feedback-msg success';
                    feedbackMsg.style.display = 'block';
                    feedbackMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> <strong>Spot on!</strong> Balanced Red-Black Trees guarantee <code>O(log N)</code> worst-case search, insertion, and deletion.';
                }
                showToast('🎉 Correct answer! +25 XP points earned');
            } else {
                optBtn.classList.add('wrong');
                if (feedbackMsg) {
                    feedbackMsg.className = 'quiz-feedback-msg error';
                    feedbackMsg.style.display = 'block';
                    feedbackMsg.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> <strong>Incorrect.</strong> The correct answer is <strong>B: O(log N)</strong> due to height balancing.';
                }
            }
        });
    });

    if (btnMoreMocks) {
        btnMoreMocks.addEventListener('click', (e) => {
            showToast('Unlocking 5,000+ Full Mock Series on XShare App...');
            window.open(PLAY_STORE_URL, '_blank');
        });
    }

    if (btnDemoMock) {
        btnDemoMock.addEventListener('click', () => {
            const mockSection = document.getElementById('interactive-tools');
            if (mockSection) mockSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

/* ==========================================================================
   11. Full Experience Reader Modal
   ========================================================================== */
const experiencesDatabase = {
    'google-1': {
        company: 'Google',
        role: 'Software Engineer (L4)',
        ctc: '₹52,00,000 CTC + RSUs',
        location: 'Bengaluru / Hyderabad',
        author: 'Sneha Das • Google L4 (Ex-IIT Roorkee)',
        date: 'September 2026',
        rounds: [
            {
                title: 'Round 1: Online Assessment (Google Form & Screen)',
                content: 'Two algorithmic problems: 1. Directed graph cycle detection with weight constraints (solved via Topological sort + Dijkstra). 2. String sliding window optimization. Scored 100% test cases.'
            },
            {
                title: 'Round 2: Technical Interview 1 (DSA & Algorithms)',
                content: 'Interviewer asked to design an LRU cache with expiration TTL that can handle concurrent thread-safe reads and writes. Discussed mutex locking vs Read-Write locks and lock-free buckets.'
            },
            {
                title: 'Round 3: Technical Interview 2 (System Design)',
                content: 'Designed a real-time collaborative Google Docs editor with Operational Transformation (OT) / CRDTs, WebSocket gateway clustering, and conflict-free replication.'
            },
            {
                title: 'Round 4: Googleyness & Leadership Round',
                content: 'Deep behavioral questions on handling peer disagreements, mentoring junior teammates, prioritizing technical debt vs product deadlines.'
            }
        ],
        tips: 'Focus heavily on code cleanliness, speaking your thought process aloud before writing code, and always clarifying edge cases and input bounds!'
    },
    'ms-1': {
        company: 'Microsoft',
        role: 'Software Development Engineer (SDE-1)',
        ctc: '₹44,00,000 CTC',
        location: 'Hyderabad, India',
        author: 'Ankesh Mishra • Microsoft SDE',
        date: 'August 2026',
        rounds: [
            {
                title: 'Round 1: Online Coding Round',
                content: '3 questions on Codility: DP on grids, Trie implementation for prefix auto-complete, and Bit manipulation.'
            },
            {
                title: 'Round 2: DSA & Problem Solving',
                content: 'Binary tree boundary traversal, followed by converting binary tree into a doubly linked list in O(1) space.'
            },
            {
                title: 'Round 3: Low Level Design & Core CS',
                content: 'Designed an elevator management system adhering to SOLID principles and State design pattern. Discussed OS virtual memory & paging.'
            },
            {
                title: 'Round 4: Techno-Managerial Fitment',
                content: 'Discussed past projects, high-load scaling challenges, and Microsoft cultural values.'
            }
        ],
        tips: 'Microsoft interviewers love clean object-oriented design and detailed complexity analysis. Practice explaining design patterns!'
    },
    'adobe-1': {
        company: 'Adobe',
        role: 'Data Scientist / ML Engineer',
        ctc: '₹38,00,000 CTC',
        location: 'Noida, India',
        author: 'Priya Singh • Adobe Data Science',
        date: 'July 2026',
        rounds: [
            {
                title: 'Round 1: Machine Learning & Math Foundations',
                content: 'Linear algebra derivations, gradient descent variations (Adam vs RMSprop), regularization math (L1 vs L2 loss).'
            },
            {
                title: 'Round 2: Applied NLP & LLM Fine-Tuning',
                content: 'Transformer attention mechanism calculations, LoRA parameter calculations, and vector search indexing algorithms (HNSW vs IVF).'
            },
            {
                title: 'Round 3: Data Systems & Product Case',
                content: 'Designed a real-time recommendation engine for Adobe Creative Cloud assets handling 50k QPS.'
            }
        ],
        tips: 'Know the mathematics behind algorithms, not just calling scikit-learn or PyTorch library methods!'
    },
    'zomato-1': {
        company: 'Zomato',
        role: 'Associate Product Manager (APM)',
        ctc: '₹30,00,000 CTC',
        location: 'Gurugram, India',
        author: 'Rohan Kapoor • APM @ Zomato',
        date: 'August 2026',
        rounds: [
            {
                title: 'Round 1: Product Sense Assignment',
                content: 'Teardown assignment on improving 10-minute instant delivery rider allocation efficiency and reducing food spill complaints.'
            },
            {
                title: 'Round 2: Live Case Study & Metric Analysis',
                content: 'Live brainstorming on surge pricing algorithms and prioritizing cart checkout conversion vs average order value.'
            },
            {
                title: 'Round 3: Leadership & Founder Alignment',
                content: 'Discussion on high-ownership mentality, dealing with uncertainty, and execution velocity in hyper-growth startups.'
            }
        ],
        tips: 'Structure your answers using the CIRCLES framework and back every recommendation with realistic user metrics.'
    },
    'amazon-1': {
        company: 'Amazon',
        role: 'Summer SDE Intern 2026',
        ctc: '₹1,10,000 / Month Stipend',
        location: 'Bengaluru, India',
        author: 'Vikram Kumar • Amazon Intern',
        date: 'August 2026',
        rounds: [
            {
                title: 'Round 1: Online Assessment (OA)',
                content: '2 coding problems on sliding window and topological sort, followed by Amazon Work Style Assessment simulation.'
            },
            {
                title: 'Round 2: Technical & Leadership Principles',
                content: 'Top K frequent elements using min-heap. 30 minutes dedicated to "Customer Obsession" and "Bias for Action" stories using the STAR method.'
            }
        ],
        tips: 'Prepare 2 solid stories for every Amazon Leadership Principle in advance.'
    },
    'uber-1': {
        company: 'Uber',
        role: 'Software Engineer II',
        ctc: '₹58,00,000 CTC',
        location: 'Hyderabad, India',
        author: 'Tanmay Gupta • Uber SE-II',
        date: 'July 2026',
        rounds: [
            {
                title: 'Round 1: Machine Coding / Concurrency',
                content: 'Built an in-memory pub-sub event bus supporting regex topic filtering and consumer group offsets.'
            },
            {
                title: 'Round 2: High Scale System Design',
                content: 'Designed Uber dynamic ride dispatch engine with geospatial queries (H3 hexagonal cells) and fault tolerance.'
            },
            {
                title: 'Round 3: Deep DSA & Graph Algorithms',
                content: 'Shortest path algorithms in dynamic graphs with edge weight mutations over time.'
            }
        ],
        tips: 'Master concurrency primitives, mutex locks, and distributed storage patterns before interviewing with Uber.'
    }
};

function initExperienceReaderModal() {
    const readerModal = document.getElementById('reader-modal');
    const readerCloseBtn = document.getElementById('reader-close-btn');
    const readBtns = document.querySelectorAll('.btn-read-exp');

    readBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Open the Play Store download link directly in a new tab
            window.open(PLAY_STORE_URL, '_blank');
        });
    });

    if (readerCloseBtn && readerModal) {
        readerCloseBtn.addEventListener('click', () => {
            readerModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        readerModal.addEventListener('click', (e) => {
            if (e.target === readerModal) {
                readerModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    const shareBtn = document.getElementById('btn-share-experience');
    if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
            showToast('Opening XShare App to share your experience...');
            window.open(PLAY_STORE_URL, '_blank');
        });
    }
}

function openExperienceReader(expId) {
    const readerModal = document.getElementById('reader-modal');
    const readerBody = document.getElementById('reader-content-body');
    const data = experiencesDatabase[expId] || experiencesDatabase['google-1'];

    if (!readerModal || !readerBody) return;

    let roundsHtml = data.rounds.map((r, idx) => `
        <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 18px; margin-bottom: 14px;">
            <h5 style="color: var(--accent-primary); font-size: 1rem; margin-bottom: 8px; font-weight: 700;">${r.title}</h5>
            <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">${r.content}</p>
        </div>
    `).join('');

    readerBody.innerHTML = `
        <div style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
                <span class="badge-verif"><i class="fa-solid fa-shield-check"></i> Verified Candidate Submission</span>
                <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;"><i class="fa-regular fa-calendar"></i> ${data.date}</span>
            </div>
            <h2 style="font-size: 1.8rem; margin-bottom: 6px; color: var(--text-primary);">${data.company} - ${data.role}</h2>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
                <span class="pill-mini tag-ctc">${data.ctc}</span>
                <span class="pill-mini tag-campus">${data.location}</span>
                <span class="pill-mini tag-rounds">${data.author}</span>
            </div>
        </div>

        <h4 style="font-size: 1.15rem; margin-bottom: 14px; color: var(--text-primary);">Interview Rounds Breakdown</h4>
        ${roundsHtml}

        <div style="background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 12px; padding: 18px; margin-top: 20px;">
            <h5 style="color: var(--accent-primary); font-size: 0.95rem; margin-bottom: 6px; font-weight: 700;"><i class="fa-solid fa-lightbulb"></i> Candidate's Key Advice</h5>
            <p style="color: var(--text-primary); font-size: 0.875rem; line-height: 1.6;">${data.tips}</p>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 14px;">
            <button class="btn btn-secondary btn-sm" id="btn-save-modal-exp"><i class="fa-regular fa-bookmark"></i> Save for Prep</button>
            <button class="btn btn-primary btn-sm" id="btn-mock-modal-trigger"><i class="fa-solid fa-laptop-code"></i> Practice Similar Mock Test</button>
        </div>
    `;

    readerModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Hook inside buttons
    const btnSave = document.getElementById('btn-save-modal-exp');
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            showToast('Saved experience to your account!');
        });
    }

    const btnMockTrigger = document.getElementById('btn-mock-modal-trigger');
    if (btnMockTrigger) {
        btnMockTrigger.addEventListener('click', () => {
            readerModal.classList.remove('active');
            document.body.style.overflow = '';
            const mockSection = document.getElementById('interactive-tools');
            if (mockSection) mockSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

/* ==========================================================================
   12. App Download Modal (QR Code)
   ========================================================================== */
function initAppModals() {
    const appModal = document.getElementById('app-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const btnNavApp = document.getElementById('btn-get-app-nav');
    const btnDownloadPlay = document.getElementById('btn-download-play');
    const btnDownloadApple = document.getElementById('btn-download-apple');

    if (btnNavApp) {
        btnNavApp.addEventListener('click', (e) => {
            window.open(PLAY_STORE_URL, '_blank');
        });
    }
    if (btnDownloadPlay) {
        btnDownloadPlay.addEventListener('click', (e) => {
            window.open(PLAY_STORE_URL, '_blank');
        });
    }
    if (btnDownloadApple) {
        btnDownloadApple.addEventListener('click', (e) => {
            window.open(PLAY_STORE_URL, '_blank');
        });
    }

    if (modalCloseBtn && appModal) {
        modalCloseBtn.addEventListener('click', closeAppModal);
        appModal.addEventListener('click', (e) => {
            if (e.target === appModal) closeAppModal();
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAppModal();
            const readerModal = document.getElementById('reader-modal');
            if (readerModal) readerModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function openAppModal() {
    const appModal = document.getElementById('app-modal');
    if (appModal) {
        appModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAppModal() {
    const appModal = document.getElementById('app-modal');
    if (appModal) {
        appModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ==========================================================================
   13. FAQ Accordion Toggle
   ========================================================================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(i => i.classList.remove('active'));

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

/* ==========================================================================
   14. Keyboard Shortcuts (Cmd/Ctrl + K) & Search Trigger
   ========================================================================== */
function initKeyboardShortcuts() {
    const searchTriggerBtn = document.getElementById('search-trigger-btn');
    const heroSearchInput = document.getElementById('hero-search-input');

    function focusSearch() {
        if (heroSearchInput) {
            heroSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                heroSearchInput.focus();
                heroSearchInput.select();
            }, 300);
        }
    }

    if (searchTriggerBtn) {
        searchTriggerBtn.addEventListener('click', focusSearch);
    }

    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            focusSearch();
        }
    });
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toast-msg');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

/* ==========================================================================
   15. Video Sound Controller & Autoplay Handler
   ========================================================================== */
function initVideoSound() {
    const video = document.getElementById('showcase-video');
    const soundToggleBtn = document.getElementById('video-sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    const soundText = document.getElementById('sound-text');
    const unmuteOverlay = document.getElementById('video-unmute-overlay');
    const videoContainer = document.getElementById('video-container');

    if (!video) return;

    // Set full audio volume
    video.volume = 1.0;

    function updateSoundUI(isMuted) {
        if (!isMuted) {
            if (soundIcon) soundIcon.className = 'fa-solid fa-volume-high';
            if (soundText) soundText.textContent = 'Sound ON';
            if (soundToggleBtn) soundToggleBtn.classList.add('active-sound');
            if (unmuteOverlay) unmuteOverlay.classList.add('hidden');
        } else {
            if (soundIcon) soundIcon.className = 'fa-solid fa-volume-xmark';
            if (soundText) soundText.textContent = 'Sound OFF';
            if (soundToggleBtn) soundToggleBtn.classList.remove('active-sound');
            if (unmuteOverlay) unmuteOverlay.classList.remove('hidden');
        }
    }

    function toggleSound(e) {
        if (e) e.stopPropagation();
        if (video.muted) {
            video.muted = false;
            video.volume = 1.0;
            video.play();
            updateSoundUI(false);
            showToast('🔊 Video Audio Enabled');
        } else {
            video.muted = true;
            updateSoundUI(true);
            showToast('🔇 Video Audio Muted');
        }
    }

    // Try unmuted playback first
    video.muted = false;
    const playAttempt = video.play();
    if (playAttempt !== undefined) {
        playAttempt.then(() => {
            updateSoundUI(false);
        }).catch(() => {
            // Autoplay with sound blocked by browser policy; start muted and wait for user gesture
            video.muted = true;
            video.play();
            updateSoundUI(true);
        });
    }

    // Auto unmute on first user interaction anywhere on the document
    const handleFirstGesture = () => {
        if (video.muted) {
            video.muted = false;
            video.volume = 1.0;
            video.play().then(() => {
                updateSoundUI(false);
            }).catch(() => {});
        }
        window.removeEventListener('click', handleFirstGesture);
        window.removeEventListener('touchstart', handleFirstGesture);
        window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    if (soundToggleBtn) soundToggleBtn.addEventListener('click', toggleSound);
    if (unmuteOverlay) unmuteOverlay.addEventListener('click', toggleSound);
    if (videoContainer) videoContainer.addEventListener('click', (e) => {
        if (e.target !== soundToggleBtn && !soundToggleBtn?.contains(e.target)) {
            toggleSound(e);
        }
    });
}

