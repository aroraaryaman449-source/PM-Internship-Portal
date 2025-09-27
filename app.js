// Enhanced PM Internship Portal - Updated with Bug Fixes and Feature Enhancements
class PMInternshipPortal {
    constructor() {
        this.currentLanguage = 'en';
        this.currentUser = null;
        this.isLoggedIn = false;
        this.userType = null; // 'student' or 'admin'
        this.profileWizardStep = 1;
        this.voices = [];
        this.userProfile = {
            name: '',
            email: '',
            phone: '',
            education: null,
            score10th: '',
            score12th: '',
            scoreHigher: '',
            skills: [],
            interests: [],
            preferredLocations: [],
            cvFile: null,
            cvFileName: null,
            cvFileSize: null,
            hasCompletedOnboarding: false,
            homeDistrict: 'Jaipur',
            homeState: 'Rajasthan',
            hasCompletedDigitalSkillsQuiz: false
        };
        this.recommendations = [];
        this.applications = [];
        this.bookmarks = [];
        this.dismissedRecommendations = [];
        this.offlineMode = false;
        this.ttsSupported = false;
        this.currentSpeech = null;
        this.isReading = false;
        this.pendingApplication = null;
        
        // Data for the rule-based recommendation engine
        this.relatedSkills = {
            "Programming": ["Python", "Java", "C++"],
            "Web Development": ["HTML", "CSS", "JavaScript", "React"],
            "Data": ["SQL", "Data Analysis", "MS Excel", "Data Collection"],
            "Communication": ["Communication Skills", "Content Writing", "Report Writing", "Presentation Skills"],
            "Marketing": ["Social Media Marketing", "SEO"]
        };

        this.relatedInterests = {
            "Technology": ["Web Development", "Cybersecurity", "Data Analysis"],
            "Governance": ["Policy", "Law", "Rural Development"],
            "Business": ["Finance", "Marketing", "Event Management"],
            "Creative": ["Design", "Writing", "Photography", "Video Editing", "Media"]
        };
        
        this.locationData = {
            "Rajasthan": {
                "Jaipur": ["Sikar", "Nagaur", "Ajmer", "Tonk", "Dausa", "Alwar"]
            }
        };

        this.educationHierarchy = { "10th": 1, "12th": 2, "diploma": 3, "graduate": 4, "postgraduate": 5 };

        // Comprehensive Government Internship Dataset - CURATED AND EXPANDED
        this.internshipsData = [
            {
                id: 1,
                title: "Foreign Policy Intern",
                organization: "Ministry of External Affairs (MEA)",
                department: "Policy Planning & Research",
                location: "New Delhi",
                duration: "1 to 3 Months",
                stipend: "₹10,000/month",
                required_skills: ["Research", "Report Writing", "English"],
                interests: ["Public Admin", "International Relations", "Policy"],
                education_levels: ["graduate", "postgraduate"],
                description: "A prestigious program to understand the formulation and implementation of India's foreign policy.",
                applied_count: 250,
                total_positions: 30,
            },
            {
                id: 2,
                title: "Industry & Trade Intern",
                organization: "DPIIT, Ministry of Commerce",
                department: "Industrial Policy",
                location: "New Delhi",
                duration: "1 to 3 Months",
                stipend: "₹10,000/month",
                required_skills: ["Research", "Data Analysis", "MS Office"],
                interests: ["Public Admin", "Economics", "Policy"],
                education_levels: ["graduate", "postgraduate"],
                description: "Gain exposure to industrial policy, trade, and investment promotion schemes of the Government of India.",
                applied_count: 180,
                total_positions: 25,
            },
            {
                id: 3,
                title: "Women & Child Development Intern",
                organization: "Ministry of Women & Child Development",
                department: "Policy & Research",
                location: "New Delhi",
                duration: "2 Months",
                stipend: "₹20,000/month",
                required_skills: ["Social Work", "Research", "Report Writing"],
                interests: ["Public Admin", "Social Development", "Policy"],
                education_levels: ["graduate", "postgraduate"],
                description: "For women from non-tier-I cities to work on policies and programs concerning women and children. Hostel provided.",
                applied_count: 165,
                total_positions: 20,
            },
            {
                id: 4,
                title: "Panchayati Raj Intern",
                organization: "Ministry of Panchayati Raj",
                department: "Rashtriya Gram Swaraj Abhiyan",
                location: "New Delhi",
                duration: "Up to 6 Months",
                stipend: "₹7,000/month",
                required_skills: ["Data Analysis", "Communication Skills", "Hindi"],
                interests: ["Public Admin", "Rural Development", "Governance"],
                education_levels: ["graduate"],
                description: "Work on rural governance and Panchayati Raj Institution schemes under the RGSA scheme. Hybrid/Remote possible.",
                applied_count: 210,
                total_positions: 40,
            },
            {
                id: 5,
                title: "Environment & Climate Change Intern",
                organization: "Ministry of Environment, Forest & Climate Change",
                department: "Policy & Conservation",
                location: "New Delhi",
                duration: "Up to 3 Months",
                stipend: "₹10,000/month",
                required_skills: ["Environmental Science", "Research", "Data Collection"],
                interests: ["Public Admin", "Environment", "Policy"],
                education_levels: ["graduate", "postgraduate"],
                description: "Contribute to environmental policy, conservation, and climate change initiatives. Placements available across India.",
                applied_count: 190,
                total_positions: 35,
            },
            {
                id: 6,
                title: "Policy Intern",
                organization: "NITI Aayog",
                department: "Various Verticals",
                location: "New Delhi",
                duration: "6 Weeks to 6 Months",
                stipend: "Unpaid",
                required_skills: ["Data Analysis", "Research", "Report Writing"],
                interests: ["Public Policy", "Economics", "Governance"],
                education_levels: ["graduate", "postgraduate"],
                description: "Contribute to policy analysis and formulation at India's premier policy think tank. Highly competitive.",
                applied_count: 350,
                total_positions: 50,
            },
            {
                id: 7,
                title: "Legislative Research Intern",
                organization: "PRS Legislative Research",
                department: "Research",
                location: "New Delhi",
                duration: "1 to 2 Months",
                stipend: "Unpaid",
                required_skills: ["Legal Research", "Writing", "Analytical Skills"],
                interests: ["Public Policy", "Law", "Governance"],
                education_levels: ["graduate", "postgraduate"],
                description: "Provide direct research support to Members of Parliament on bills, policies, and parliamentary proceedings.",
                applied_count: 120,
                total_positions: 15,
            },
            {
                id: 8,
                title: "Policy Research Intern",
                organization: "India Policy Foundation (IPF)",
                department: "Academic Council",
                location: "New Delhi",
                duration: "1 to 6 Months",
                stipend: "Unpaid (Paid for >2 Months)",
                required_skills: ["Research", "Data Collection", "Report Writing"],
                interests: ["Public Policy", "Research", "Social Sciences"],
                education_levels: ["graduate", "postgraduate"],
                description: "Conduct data collection, analysis, and report writing on various policy topics within a think tank environment.",
                applied_count: 90,
                total_positions: 10,
            },
            {
                id: 9,
                title: "Abhijit Sen Rural Intern",
                organization: "National Foundation for India (NFI)",
                department: "Field Research",
                location: "Various",
                duration: "50 Days",
                stipend: "₹20,000 (Lump Sum)",
                required_skills: ["Community Engagement", "Research", "Hindi"],
                interests: ["Rural Development", "Research", "Social Work"],
                education_levels: ["graduate", "postgraduate"],
                description: "A 50-day field research program on socio-economic issues in rural India. All travel, food, and accommodation expenses are covered.",
                applied_count: 150,
                total_positions: 25,
            },
            {
                id: 10,
                title: "Humanitarian Sector Intern",
                organization: "UNICEF",
                department: "Various",
                location: "Various",
                duration: "6 to 26 Weeks",
                stipend: "Paid",
                required_skills: ["Social Work", "Research", "Communication Skills"],
                interests: ["Social Development", "Public Health", "Child Rights"],
                education_levels: ["graduate", "postgraduate"],
                description: "Gain hands-on experience in the humanitarian sector focusing on child rights and welfare programs across India.",
                applied_count: 280,
                total_positions: 30,
            },
            {
                id: 11,
                title: "Tribal Development Communications Intern",
                organization: "UNDP",
                department: "National Tribal Research Institute",
                location: "Delhi",
                duration: "6 Months",
                stipend: "Paid",
                required_skills: ["Content Writing", "Social Media Marketing", "Video Editing"],
                interests: ["Social Development", "Tribal Development", "Media"],
                education_levels: ["graduate"],
                description: "Support the National Tribal Research Institute (NTRI) with communications, creating case studies and promotional material.",
                applied_count: 85,
                total_positions: 5,
            },
            {
                id: 12,
                title: "Education NGO Intern",
                organization: "Bhumi NGO",
                department: "Education Programs",
                location: "Chennai",
                duration: "1 to 3 Months",
                stipend: "Unpaid",
                required_skills: ["Teaching", "Community Engagement", "Event Management"],
                interests: ["Social Development", "Education", "Volunteering"],
                education_levels: ["12th", "graduate"],
                description: "Learn about the non-profit ecosystem by working on grassroots education programs for underprivileged children.",
                applied_count: 220,
                total_positions: 50,
            },
            {
                id: 13,
                title: "Circular Economy Intern",
                organization: "Goonj",
                department: "Processing & Operations",
                location: "Various",
                duration: "1 to 3 Months",
                stipend: "Unpaid",
                required_skills: ["Community Engagement", "Volunteering"],
                interests: ["Social Development", "Environment", "Rural Development"],
                education_levels: ["12th", "graduate"],
                description: "Work on circular economy and rural development initiatives by helping process urban surplus materials for rural communities.",
                applied_count: 300,
                total_positions: 100,
            },
            {
                id: 14,
                title: "Education Research Intern",
                organization: "Pratham Education Foundation",
                department: "Research & Evaluation",
                location: "Various",
                duration: "1 to 6 Months",
                stipend: "Unpaid",
                required_skills: ["Research", "Data Analysis", "MS Excel"],
                interests: ["Education", "Social Development", "Policy"],
                education_levels: ["graduate", "postgraduate"],
                description: "Work with a leading education NGO on research, technology-based learning programs, and government partnerships.",
                applied_count: 140,
                total_positions: 20,
            },
            {
                id: 15,
                title: "Digital India Intern",
                organization: "Ministry of Electronics & IT (MeitY)",
                department: "National e-Governance Division",
                location: "New Delhi",
                duration: "2 to 3 Months",
                stipend: "₹10,000/month",
                required_skills: ["Cybersecurity", "AI", "Blockchain", "Cloud Computing"],
                interests: ["Technology", "Public Admin", "Governance"],
                education_levels: ["graduate", "postgraduate"],
                description: "Work on live projects in e-governance, AI, and cybersecurity as part of the flagship Digital India initiative.",
                applied_count: 200,
                total_positions: 30,
            },
            {
                id: 16,
                title: "UI/UX Design Intern",
                organization: "National Informatics Centre (NIC)",
                department: "Design & Development",
                location: "New Delhi",
                duration: "2 to 3 Months",
                stipend: "₹10,000/month",
                required_skills: ["UI/UX Design", "Figma", "Adobe XD"],
                interests: ["Technology", "Design", "Public Services"],
                education_levels: ["graduate"],
                description: "Design user interfaces and experiences for government applications and websites to improve digital public services.",
                applied_count: 95,
                total_positions: 10,
            },
            {
                id: 17,
                title: "Smart Cities Intern",
                organization: "Ministry of Housing & Urban Affairs (MoHUA)",
                department: "Smart Cities Mission",
                location: "Various",
                duration: "6 to 12 Weeks",
                stipend: "Unpaid",
                required_skills: ["Urban Planning", "Research", "Project Management"],
                interests: ["Urban Planning", "Technology", "Governance"],
                education_levels: ["graduate", "postgraduate"],
                description: "Support the implementation of Smart City projects across India in areas like urban mobility, finance, and environment.",
                applied_count: 175,
                total_positions: 50,
            },
            {
                id: 18,
                title: "Atal Innovation Mission Intern",
                organization: "NITI Aayog",
                department: "Atal Innovation Mission",
                location: "New Delhi",
                duration: "6 Weeks to 6 Months",
                stipend: "Unpaid",
                required_skills: ["Entrepreneurship", "Project Management", "Communication Skills"],
                interests: ["Technology", "Entrepreneurship", "Education"],
                education_levels: ["graduate", "postgraduate"],
                description: "Support India's flagship mission to promote a culture of innovation and entrepreneurship through various national programs.",
                applied_count: 130,
                total_positions: 20,
            },
            {
                id: 19,
                title: "Public Health Intern",
                organization: "National Centre for Disease Control (NCDC)",
                department: "Epidemiology/Microbiology",
                location: "Delhi",
                duration: "2 to 6 Months",
                stipend: "Unpaid",
                required_skills: ["Biotechnology", "Microbiology", "Research"],
                interests: ["Public Health", "Life Sciences", "Healthcare"],
                education_levels: ["graduate", "postgraduate"],
                description: "Technical internship in epidemiology, microbiology, and disease surveillance for students from life science backgrounds.",
                applied_count: 110,
                total_positions: 15,
            },
            {
                id: 20,
                title: "Teach for India Fellow",
                organization: "Teach for India",
                department: "Fellowship Program",
                location: "Various",
                duration: "24 Months",
                stipend: "₹25,344/month",
                required_skills: ["Leadership", "Teaching", "Communication Skills"],
                interests: ["Education", "Leadership", "Social Development"],
                education_levels: ["graduate"],
                description: "A 2-year, full-time leadership development program where you work as a teacher in a low-income school. Relocation allowance provided.",
                applied_count: 500,
                total_positions: 100,
            },
            {
                id: 21,
                title: "Field Research Intern",
                organization: "Azim Premji Foundation",
                department: "Education/Economics",
                location: "Various",
                duration: "6 to 8 Weeks",
                stipend: "Unpaid",
                required_skills: ["Research", "Data Analysis", "Community Engagement"],
                interests: ["Education", "Economics", "Social Development"],
                education_levels: ["postgraduate"],
                description: "Field-based research internship focusing on a specific educational or economic problem in the development sector.",
                applied_count: 80,
                total_positions: 15,
            },
            {
                id: 22,
                title: "Veterinary Intern",
                organization: "GADVASU",
                department: "Clinical Training",
                location: "Ludhiana",
                duration: "6 to 12 Months",
                stipend: "₹12,000/month",
                required_skills: ["Veterinary Science", "Animal Healthcare"],
                interests: ["Healthcare", "Animal Science", "Agriculture"],
                education_levels: ["graduate"],
                description: "Mandatory professional clinical training for final-year veterinary students in a high-caseload university hospital.",
                applied_count: 50,
                total_positions: 20,
            },
            {
                id: 23,
                title: "Chief Minister's Fellow (Maharashtra)",
                organization: "Government of Maharashtra",
                department: "Various",
                location: "Various",
                duration: "12 Months",
                stipend: "Paid (Competitive)",
                required_skills: ["Project Management", "Policy Analysis", "Leadership"],
                interests: ["Public Admin", "Public Policy", "Governance"],
                education_levels: ["graduate"],
                description: "A 1-year fellowship for young professionals to work on high-priority state government initiatives. Includes a public policy course from IIT Bombay.",
                applied_count: 300,
                total_positions: 40,
            },
            {
                id: 24,
                title: "Young Intern (Rajasthan)",
                organization: "Government of Rajasthan",
                department: "Department of Planning",
                location: "Various",
                duration: "12 Months",
                stipend: "₹30,000/month",
                required_skills: ["Data Analysis", "Project Management", "Communication Skills"],
                interests: ["Public Admin", "Rural Development", "Governance"],
                education_levels: ["graduate", "postgraduate"],
                description: "A 1-year program working on government schemes at the district level in Rajasthan, with an additional ₹2,500/month allowance.",
                applied_count: 450,
                total_positions: 60,
            },
            {
                id: 25,
                title: "Chief Minister's Fellow (Tamil Nadu)",
                organization: "Government of Tamil Nadu",
                department: "Special Programme Implementation",
                location: "Various",
                duration: "24 Months",
                stipend: "₹65,000/month",
                required_skills: ["Data Analysis", "Policy Analysis", "Research"],
                interests: ["Public Admin", "Public Policy", "Economics"],
                education_levels: ["postgraduate"],
                description: "A prestigious 2-year program to monitor and evaluate flagship state schemes, with an additional ₹10,000/month allowance.",
                applied_count: 400,
                total_positions: 30,
            }
        ];


        this.languageData = {
            en: {
                welcome: "Welcome to PM Internship Portal", login_success: "Login successful!", registration_success: "Registration successful! Please complete your profile.", profile_complete: "Profile completed successfully!", application_success: "Application submitted successfully!", error_invalid_credentials: "Invalid username or password", error_mobile_invalid: "Please enter a valid 10-digit mobile number", error_passwords_mismatch: "Passwords do not match", perfect_matches: "🥇 Perfect Matches For You", match_score: "Match Score", apply_now: "Apply Now", view_details: "View Details", bookmark: "Bookmark", bookmarked: "Bookmarked", loading_recommendations: "Generating your personalized AI recommendations...", offline_message: "You're offline. Changes will be saved when you reconnect.", profile_progress: "Profile Progress", reading_page: "Reading page content...", consent_required: "We need your consent to share your profile with the organization.", consent_accepted: "Consent provided. Your application has been submitted.", consent_denied: "Application cancelled. Your profile will not be shared.", cv_uploaded: "CV uploaded successfully!", cv_upload_error: "Error uploading CV. Please try again.", not_interested: "Not Interested", recommendation_hidden: "Recommendation hidden.",
                wizard_personal: "Personal", wizard_education: "Education", wizard_skills: "Skills & Interests", wizard_locations: "Locations", wizard_previous: "Previous", wizard_next: "Next", wizard_save: "Save Profile",
                fallback_title: "No strong matches found yet.", fallback_body: "Don't worry! Here are some of the most popular internships available right now. Keep your profile updated for better matches.", popular_internships: "Popular Internships",
                login_prompt: "Please log in to apply for this internship."
            },
            hi: {
                welcome: "पीएम इंटर्नशिप पोर्टल में आपका स्वागत है", login_success: "लॉगिन सफल!", registration_success: "पंजीकरण सफल! कृपया अपनी प्रोफ़ाइल पूरी करें।", profile_complete: "प्रोफ़ाइल सफलतापूर्वक पूरी की गई!", application_success: "आवेदन सफलतापूर्वक जमा किया गया!", error_invalid_credentials: "गलत उपयोगकर्ता नाम या पासवर्ड", error_mobile_invalid: "कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें", error_passwords_mismatch: "पासवर्ड मेल नहीं खाते", perfect_matches: "🥇 आपके लिए सर्वश्रेष्ठ मैच", match_score: "मैच स्कोर", apply_now: "अभी आवेदन करें", view_details: "विवरण देखें", bookmark: "बुकमार्क", bookmarked: "बुकमार्क किया गया", loading_recommendations: "आपकी व्यक्तिगत एआई सिफारिशें तैयार की जा रही हैं...", offline_message: "आप ऑफ़लाइन हैं। पुन: कनेक्ट होने पर परिवर्तन सहेजे जाएंगे।", profile_progress: "प्रोफ़ाइल प्रगति", reading_page: "पेज की सामग्री पढ़ी जा रही है...", consent_required: "हमें संगठन के साथ आपकी प्रोफ़ाइल साझा करने के लिए आपकी सहमति चाहिए।", consent_accepted: "सहमति प्रदान की गई। आपका आवेदन जमा कर दिया गया है।", consent_denied: "आवेदन रद्द कर दिया गया। आपकी प्रोफ़ाइल साझा नहीं की जाएगी।", cv_uploaded: "सीवी सफलतापूर्वक अपलोड की गई!", cv_upload_error: "सीवी अपलोड करने में त्रुटि। कृपया पुनः प्रयास करें।", not_interested: "कोई दिलचस्पी नहीं", recommendation_hidden: "सिफारिश छिपाई गई।",
                wizard_personal: "व्यक्तिगत", wizard_education: "शिक्षा", wizard_skills: "कौशल और रुचियाँ", wizard_locations: "स्थान", wizard_previous: "पिछला", wizard_next: "अगला", wizard_save: "प्रोफ़ाइल सहेजें",
                fallback_title: "अभी तक कोई मजबूत मैच नहीं मिला।", fallback_body: "चिंता न करें! यहां अभी उपलब्ध कुछ सबसे लोकप्रिय इंटर्नशिप हैं। बेहतर मैच के लिए अपनी प्रोफ़ाइल अपडेट करते रहें।", popular_internships: "लोकप्रिय इंटर्नशिप",
                login_prompt: "इस इंटर्नशिप के लिए आवेदन करने के लिए कृपया लॉग इन करें।"
            }
        };

        this.educationLevels = [ {id: "10th", label_en: "10th Pass", label_hi: "दसवीं पास"}, {id: "12th", label_en: "12th Pass", label_hi: "बारहवीं पास"}, {id: "diploma", label_en: "Diploma", label_hi: "डिप्लोमा"}, {id: "graduate", label_en: "Graduate", label_hi: "स्नातक"}, {id: "postgraduate", label_en: "Post Graduate", label_hi: "स्नातकोत्तर"} ];
        
        this.categorizedSkillsData = {
            en: {
                "Computer Skills": ["MS Office", "Basic Computer", "Digital Literacy"],
                "Communication & Language": ["Communication Skills", "Content Writing", "Report Writing", "Presentation Skills", "Hindi", "English", "Translation"],
                "Community & Social Work": ["Community Engagement", "Volunteering", "Teaching", "Social Work"],
                "Technical & Data": ["Python", "Java", "SQL", "Data Analysis", "Cybersecurity", "Web Development", "Blockchain", "AI", "Cloud Computing"],
                "Creative & Design": ["Photography", "Video Editing", "UI/UX Design", "Figma", "Adobe XD", "Adobe Photoshop"],
                "Management & Professional": ["Project Management", "Leadership", "Event Management", "Marketing", "SEO", "Finance"],
                "Research & Science": ["Research", "Legal Research", "Analytical Skills", "Data Collection", "Environmental Science", "Biotechnology", "Microbiology", "Veterinary Science", "Animal Healthcare"]
            },
            hi: {
                "कंप्यूटर कौशल": ["एमएस ऑफिस", "बेसिक कंप्यूटर", "डिजिटल साक्षरता"],
                "संचार और भाषा": ["संचार कौशल", "कंटेंट राइटिंग", "रिपोर्ट लेखन", "प्रस्तुति कौशल", "हिंदी", "अंग्रेजी", "अनुवाद"],
                "सामुदायिक और सामाजिक कार्य": ["सामुदायिक सहभागिता", "स्वयंसेवा", "शिक्षण", "सामाजिक कार्य"],
                "तकनीकी और डेटा": ["पाइथन", "जावा", "एसक्यूएल", "डेटा विश्लेषण", "साइबर सुरक्षा", "वेब डेवलपमेंट", "ब्लॉकचेन", "एआई", "क्लाउड कंप्यूटिंग"],
                "रचनात्मक और डिजाइन": ["फोटोग्राफी", "वीडियो एडिटिंग", "यूआई/यूएक्स डिजाइन", "फिग्मा", "एडोब एक्सडी", "एडोब फोटोशॉप"],
                "प्रबंधन और पेशेवर": ["परियोजना प्रबंधन", "नेतृत्व", "इवेंट मैनेजमेंट", "मार्केटिंग", "एसईओ", "वित्त"],
                "अनुसंधान और विज्ञान": ["अनुसंधान", "कानूनी अनुसंधान", "विश्लेषणात्मक कौशल", "डेटा संग्रह", "पर्यावरण विज्ञान", "जैव प्रौद्योगिकी", "माइक्रोबायोलॉजी", "पशु चिकित्सा विज्ञान", "पशु स्वास्थ्य सेवा"]
            }
        };

        this.skillsData = Object.values(this.categorizedSkillsData.en).flat().sort();
        this.interestsData = [ "Public Admin", "International Relations", "Economics", "Social Development", "Rural Development", "Environment", "Public Policy", "Law", "Governance", "Research", "Social Sciences", "Social Work", "Child Rights", "Tribal Development", "Media", "Education", "Volunteering", "Technology", "Public Services", "Design", "Entrepreneurship", "Public Health", "Life Sciences", "Healthcare", "Leadership", "Animal Science", "Agriculture", "Culture", "History" ].sort();
        this.locationOptions = [ "New Delhi", "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal", "Visakhapatnam", "Patna", "Ludhiana", "Various", "Remote/Work from Home", "Willing to Relocate" ].sort();

        // Simple in-app navigation history stack
        this._pageHistory = [];
        // Accessibility helpers
        this._lastFocusedElement = null;
        this._modalKeydownHandler = null;
        this._currentOpenModal = null;
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApplication());
        } else {
            this.setupApplication();
        }
    }

    setupApplication() {
        this.loadSavedData();
        this.setupEventListeners();
        this.setupTTS();
        this.setupOfflineSupport();
        this.updateLanguageElements();
    }

    setupEventListeners() {
        this.setupLanguageSwitcher();
        this.setupGetStartedButton();
        this.setupLoginHandlers();
        this.setupNavigationHandlers();
        this.setupDashboardHandlers();
        this.setupModalHandlers();
        this.setupReadPageHandler();
        this.setupBackButton();
        this.setupChatbot();
        this.setupBrowsePage();
    }

    setupBackButton() {
        const backBtn = document.getElementById('back-btn');
        if (!backBtn) return;
        backBtn.addEventListener('click', () => this.goBack());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this._currentOpenModal) {
                 this.goBack();
            }
        });
    }

    setupLanguageSwitcher() {
        const languageToggle = document.getElementById('language-toggle');
        const languageDropdown = document.getElementById('language-dropdown');
        if (!languageToggle || !languageDropdown) return;

        languageToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('hidden');
        });

        const options = Array.from(document.querySelectorAll('.language-option'));
        const bindOption = (option) => option.addEventListener('click', (e) => {
            const lang = e.currentTarget.getAttribute('data-lang');
            this.switchLanguage(lang);
            options.forEach(o => o.classList.toggle('active', o.getAttribute('data-lang') === lang));
            languageDropdown.classList.add('hidden');
        });
        options.forEach(bindOption);

        document.addEventListener('click', () => languageDropdown.classList.add('hidden'));
        options.forEach(o => o.classList.toggle('active', o.getAttribute('data-lang') === this.currentLanguage));
    }

    setupGetStartedButton() {
        document.getElementById('get-started-btn')?.addEventListener('click', () => {
            this.showLoginPage();
        });
        document.getElementById('browse-internships-btn')?.addEventListener('click', () => {
            this.populateBrowseFilters();
            this.showPage('browse-page');
            this.renderBrowseResults();
        });
    }

    setupLoginHandlers() {
        document.querySelectorAll('.login-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchLoginTab(e.currentTarget.getAttribute('data-tab')));
        });
        document.getElementById('student-login-form')?.addEventListener('submit', (e) => { e.preventDefault(); this.handleStudentLogin(); });
        document.getElementById('admin-login-form')?.addEventListener('submit', (e) => { e.preventDefault(); this.handleAdminLogin(); });
        document.getElementById('show-register')?.addEventListener('click', (e) => { e.preventDefault(); this.showRegistrationForm(); });
        document.getElementById('back-to-login')?.addEventListener('click', (e) => { e.preventDefault(); this.showLoginForm(); });

        const registerForm = document.getElementById('student-register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => { e.preventDefault(); this.handleStudentRegistration(); });
            document.getElementById('register-email').addEventListener('input', () => this.validateEmail());
            document.getElementById('register-mobile').addEventListener('input', () => this.validateMobile());
            const passwordInput = document.getElementById('register-password');
            passwordInput.addEventListener('input', () => { this.validatePassword(); this.validateConfirmPassword(); });
            document.getElementById('register-confirm-password').addEventListener('input', () => this.validateConfirmPassword());
            document.getElementById('toggle-password-visibility').addEventListener('click', () => this.togglePasswordVisibility());
        }
    }
    
    togglePasswordVisibility() {
        const passwordInput = document.getElementById('register-password');
        const button = document.getElementById('toggle-password-visibility');
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        button.textContent = isPassword ? '👁️' : '🙈';
    }

    setInputValidity(inputId, isValid, message = '') {
        const input = document.getElementById(inputId);
        const msgEl = document.getElementById(`${inputId.replace('register-', '')}-validation-message`);
        if(!input || !msgEl) return;

        input.classList.toggle('invalid', !isValid);
        input.classList.toggle('valid', isValid);
        msgEl.textContent = message;
    }

    validateEmail() {
        const el = document.getElementById('register-email');
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
        this.setInputValidity('register-email', isValid, isValid ? '' : 'Please enter a valid email address.');
        return isValid;
    }

    validateMobile() {
        const el = document.getElementById('register-mobile');
        const isValid = /^\d{10}$/.test(el.value);
        this.setInputValidity('register-mobile', isValid, isValid ? '' : 'Mobile number must be 10 digits.');
        return isValid;
    }

    validatePassword() {
        const password = document.getElementById('register-password').value;
        const strengthBar = document.getElementById('password-strength-bar');
        let strength = '';
        let isValid = password.length >= 8;
        let message = isValid ? '' : 'Password must be at least 8 characters long.';
        
        if (isValid) {
            const conditions = [/[A-Z]/.test(password), /[a-z]/.test(password), /\d/.test(password), /\W/.test(password)].filter(Boolean).length;
            if (conditions < 2) strength = 'weak';
            else if (conditions < 4) strength = 'medium';
            else strength = 'strong';
        }
        strengthBar.className = `password-strength-bar ${strength}`;
        this.setInputValidity('register-password', isValid, message);
        return isValid;
    }

    validateConfirmPassword() {
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm-password').value;
        const isValid = password === confirm && confirm.length > 0;
        this.setInputValidity('register-confirm-password', isValid, isValid ? '' : 'Passwords do not match.');
        return isValid;
    }

    validateTerms() {
        const isValid = document.getElementById('terms-agreement').checked;
        document.getElementById('terms-validation-message').textContent = isValid ? '' : 'You must agree to the Terms of Service.';
        return isValid;
    }

    setupNavigationHandlers() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                if (item.classList.contains('logout-btn')) { this.handleLogout(); return; }
                const section = item.getAttribute('data-section');
                if (section) {
                    this.switchDashboardSection(section);
                    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                    item.classList.add('active');
                }
            });
        });
    }

    setupDashboardHandlers() {
        document.getElementById('refresh-recommendations')?.addEventListener('click', () => {
            this.dismissedRecommendations = []; // Clear dismissed on refresh
            this.generateRecommendations();
        });
        document.getElementById('add-internship-btn')?.addEventListener('click', () => this.showAddInternshipModal());
    }

    setupModalHandlers() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close')) {
                    this.closeModals();
                }
            });
        });

        document.getElementById('close-onboarding')?.addEventListener('click', () => this.closeModals());
        document.getElementById('consent-accept')?.addEventListener('click', () => this.handleConsentAccept());
        document.getElementById('consent-deny')?.addEventListener('click', () => this.handleConsentDeny());
        document.getElementById('confirm-application')?.addEventListener('click', () => this.showConsentModal());
        document.getElementById('cancel-application')?.addEventListener('click', () => this.closeModals());
    }

    setupReadPageHandler() {
        document.getElementById('read-page-btn')?.addEventListener('click', () => this.togglePageReading());
    }

    // --- TEXT-TO-SPEECH (TTS) ENHANCEMENTS ---
    setupTTS() {
        this.ttsSupported = 'speechSynthesis' in window;
        if (this.ttsSupported) {
            // This promise resolves once voices are loaded.
            this._voicesPromise = new Promise(resolve => {
                const getVoices = () => {
                    const voices = speechSynthesis.getVoices();
                    if (voices.length > 0) {
                        resolve(voices);
                    }
                };
                if (speechSynthesis.getVoices().length > 0) {
                    resolve(speechSynthesis.getVoices());
                    return;
                }
                speechSynthesis.onvoiceschanged = getVoices;
            });
            this._voicesPromise.then(voices => this.voices = voices);
        }
    }

    async speak(text) {
        if (!this.ttsSupported || !text) return;
        
        if (this.voices.length === 0) {
            this.voices = await this._voicesPromise;
        }

        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        
        const langCode = this.currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
        utterance.lang = langCode;

        const voicePriority = ['Google', 'Microsoft', 'Natural', 'Zira', 'David'];
        let selectedVoice = null;

        const langVoices = this.voices.filter(voice => voice.lang === langCode);
        for (const priority of voicePriority) {
            selectedVoice = langVoices.find(voice => voice.name.includes(priority));
            if (selectedVoice) break;
        }

        if (!selectedVoice) {
            selectedVoice = langVoices[0];
        }
        
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        return new Promise((resolve, reject) => {
            utterance.onend = resolve;
            utterance.onerror = reject;
            speechSynthesis.speak(utterance);
        });
    }
    
    async togglePageReading() {
        const btn = document.getElementById('read-page-btn');
        if (!btn || !this.ttsSupported) return;

        if (this.isReading) {
            speechSynthesis.cancel(); // This will trigger the 'onend' and resolve the promise
            return;
        }
        
        this.isReading = true;
        btn.classList.add('reading');
        btn.querySelector('.read-icon').textContent = '⏸️';

        try {
            let textToRead = this.getTextForReading();
            if (!textToRead) {
                this.showToast('No readable content found on this page.', 'warning');
                return;
            }
            await this.speak(textToRead);
        } catch (error) {
            console.error("TTS Error:", error);
            if(error.error !== 'interrupted') {
                this.showToast("Sorry, there was an error reading the page.", 'error');
            }
        } finally {
            this.isReading = false;
            btn.classList.remove('reading');
            btn.querySelector('.read-icon').textContent = '🔊';
        }
    }

    getTextForReading() {
        let textToRead = '';
        const activePage = document.querySelector('section:not(.hidden)');
        
        if (this._currentOpenModal) {
            const title = this._currentOpenModal.querySelector('h2')?.textContent;
            const subtitle = this._currentOpenModal.querySelector('p')?.textContent;
            textToRead = `${title || ''}. ${subtitle || ''}`;
        } else if (activePage) {
           switch(activePage.id) {
                case 'hero-page': {
                    const title = activePage.querySelector('.hero-title')?.textContent;
                    const subtitle = activePage.querySelector('.hero-subtitle')?.textContent;
                    const desc = activePage.querySelector('.hero-description')?.textContent;
                    textToRead = `${title}. ${subtitle}. ${desc}`;
                    break;
                }
                case 'login-page': {
                    const title = activePage.querySelector('h2')?.textContent;
                    const desc = activePage.querySelector('p')?.textContent;
                    textToRead = `${title}. ${desc}`;
                    break;
                }
                case 'browse-page': {
                    const title = activePage.querySelector('h3')?.textContent;
                    const resultsCount = activePage.querySelectorAll('.recommendation-card').length;
                    const resultsText = this.currentLanguage === 'hi' ? `${resultsCount} परिणाम मिले।` : `${resultsCount} results found.`;
                    textToRead = `${title}. ${resultsText}`;
                    break;
                }
                case 'dashboard-page': {
                    const activeSection = activePage.querySelector('.dashboard-section.active');
                    if (activeSection) {
                        const title = activeSection.querySelector('h2')?.textContent;
                        let contentText = '';
                        switch(activeSection.id) {
                            case 'recommendations-section': {
                                const cards = activeSection.querySelectorAll('.recommendation-card');
                                if(cards.length > 0) {
                                    contentText = this.currentLanguage === 'hi' ? `आपकी पहली सिफारिश है:` : `Your first recommendation is:`;
                                    const firstCardTitle = cards[0].querySelector('.recommendation-title')?.textContent;
                                    const firstCardOrg = cards[0].querySelector('.recommendation-org')?.textContent;
                                    contentText += ` ${firstCardTitle} at ${firstCardOrg}.`;
                                } else {
                                    contentText = this.currentLanguage === 'hi' ? `कोई सिफारिश नहीं मिली।` : `No recommendations found.`;
                                }
                                break;
                            }
                            case 'applications-section': {
                                const cards = activeSection.querySelectorAll('.application-card');
                                contentText = this.currentLanguage === 'hi' ? `आपने ${cards.length} इंटर्नशिप के लिए आवेदन किया है।` : `You have ${cards.length} applications.`;
                                break;
                            }
                            case 'profile-section': {
                                const name = this.userProfile.name;
                                const education = this.getEducationLabel(this.userProfile.education);
                                contentText = this.currentLanguage === 'hi' ? `यह आपकी प्रोफ़ाइल है। नाम: ${name}. शिक्षा: ${education}.` : `This is your profile. Name: ${name}. Education: ${education}.`;
                                break;
                            }
                        }
                        textToRead = `${title}. ${contentText}`;
                    }
                    break;
                }
            }
        }
        return textToRead.trim();
    }
    // --- END TTS ENHANCEMENTS ---
    
    switchLanguage(lang) {
        this.currentLanguage = lang;
        this.saveData();
        this.updateLanguageElements();
        const msg = this.languageData[this.currentLanguage]?.welcome || (lang === 'hi' ? 'भाषा हिंदी में बदली गई' : 'Language switched to English');
        this.showToast(msg, 'success');
        this.setupChatbot(); // Re-initialize chatbot with new language
    }

    updateLanguageElements() {
        const lang = this.currentLanguage;
        document.querySelectorAll('[data-en]').forEach(element => {
            const englishText = element.getAttribute('data-en');
            const hindiText = element.getAttribute('data-hi');
            
            // Prefer direct attribute for translation
            const newText = (lang === 'hi' && hindiText) ? hindiText : englishText;

            if (element.children.length === 0 || element.tagName === 'BUTTON') {
                let target = element.querySelector('span:not([class])') || element;
                if (element.classList.contains('control-btn')) {
                    target = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') || element.querySelector('span[data-en]');
                }
                 if(target) target.textContent = newText;
            }
        });

        // Specific updates for dynamic elements
        const currentLangText = document.getElementById('current-language-text');
        if (currentLangText) currentLangText.textContent = lang === 'hi' ? 'हिंदी' : 'English';
        
        // Re-render dynamic components that depend on language
        if (this._currentOpenModal?.id === 'profile-modal') this.renderProfileWizard();
        const dashboardPage = document.getElementById('dashboard-page');
        if(dashboardPage && !dashboardPage.classList.contains('hidden')) {
            this.renderRecommendations();
        }
        this.populateBrowseFilters(); // Repopulate filters with correct language
    }

    showPage(pageId) {
        const current = document.querySelector('section:not(.hidden)')?.id || 'hero-page';
        if (current && current !== pageId) {
            this._pageHistory.push(current);
        }

        ['hero-page', 'login-page', 'dashboard-page', 'admin-dashboard', 'browse-page'].forEach(id => {
            document.getElementById(id)?.classList.toggle('hidden', id !== pageId);
        });

        const appDiv = document.getElementById('app');
        const headerControls = document.getElementById('header-controls');
        const chatWidget = document.getElementById('chat-widget');

        const showHeader = pageId !== 'hero-page';
        
        if (appDiv) appDiv.classList.toggle('with-header', showHeader);
        if (headerControls) headerControls.classList.toggle('hidden', !showHeader);
        if(chatWidget) chatWidget.classList.toggle('hidden', !showHeader);

        if(showHeader && chatWidget.classList.contains('show-tooltip') === false) {
            setTimeout(() => {
                chatWidget.classList.add('show-tooltip');
            }, 1000);
        }

        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            const shouldShow = this._pageHistory.length > 0;
            backBtn.classList.toggle('hidden', !shouldShow);
        }
    }

    goBack() {
        const prev = this._pageHistory.pop();
        if (!prev) {
            this.showPage('hero-page');
            return;
        }
        this.showPage(prev); 
    }

    showLoginPage() { this.showPage('login-page'); }
    showDashboard() { 
        this.showPage(this.userType === 'admin' ? 'admin-dashboard' : 'dashboard-page'); 
        if(this.userType === 'admin') this.loadAdminDashboard();
        else this.loadStudentDashboard();
    }

    switchLoginTab(tabType) {
        document.querySelectorAll('.login-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.tab === tabType));
        this.showForm(`${tabType}-login`);
    }

    handleStudentLogin() {
        const username = document.getElementById('student-username')?.value;
        const password = document.getElementById('student-password')?.value;
        if (username && password) {
            this.currentUser = { username, type: 'student', name: username };
            this.isLoggedIn = true; this.userType = 'student'; this.saveData();
            this.showToast(this.languageData[this.currentLanguage].login_success, 'success');
            if (!this.isProfileComplete()) setTimeout(() => this.showProfileModal(), 500);
            else this.showDashboard();
        } else {
            this.showToast(this.languageData[this.currentLanguage].error_invalid_credentials, 'error');
        }
    }
    
    handleAdminLogin() {
        const username = document.getElementById('admin-username')?.value;
        const password = document.getElementById('admin-password')?.value;
        
        if (username === 'admin' && password === 'admin123') {
            this.currentUser = { username: 'admin', type: 'admin', name: 'Administrator' };
            this.isLoggedIn = true;
            this.userType = 'admin';
            this.saveData();
            this.showToast(this.languageData[this.currentLanguage].login_success, 'success');
            this.showDashboard();
        } else {
            this.showToast(this.languageData[this.currentLanguage].error_invalid_credentials, 'error');
        }
    }

    showRegistrationForm() {
        this.showForm('register-form');
        document.querySelectorAll('.login-tab').forEach(tab => tab.classList.remove('active'));
    }

    showLoginForm() {
        this.switchLoginTab('student');
    }

    showForm(formIdToShow) {
        ['student-login', 'admin-login', 'register-form'].forEach(id => {
            document.getElementById(id)?.classList.toggle('active', id === formIdToShow);
        });
    }
    
    handleStudentRegistration() {
        const isValid = ['validateEmail', 'validateMobile', 'validatePassword', 'validateConfirmPassword', 'validateTerms'].every(v => this[v]());
        if (!document.getElementById('register-name')?.value) {
            this.showToast('Please enter your full name.', 'error');
            return;
        }
        if (!isValid) {
            this.showToast('Please fix the errors in the form.', 'error');
            return;
        }
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const mobile = document.getElementById('register-mobile').value;
        
        this.currentUser = { username: email, type: 'student', name, email, mobile };
        this.userProfile = { ...this.userProfile, name, email, phone: mobile };
        this.isLoggedIn = true; this.userType = 'student'; this.saveData();
        this.showToast(this.languageData[this.currentLanguage].registration_success, 'success');
        setTimeout(() => this.showProfileModal(), 500);
    }

    handleLogout() {
        this.currentUser = null; this.isLoggedIn = false; this.userType = null;
        this.userProfile = { name: '', email: '', phone: '', education: null, skills: [], interests: [], preferredLocations: [], cvFile: null, cvFileName: null, cvFileSize: null, hasCompletedOnboarding: false, score10th: '', score12th: '', scoreHigher: '' };
        this.saveData();
        this.showPage('hero-page');
        this.showToast('Logged out successfully', 'success');
    }

    showProfileModal() {
        this.profileWizardStep = 1;
        const modal = document.getElementById('profile-modal');
        modal?.classList.remove('hidden');
        this.openModalWithFocus(modal);
        this.renderProfileWizard();
    }

    // --- PROFILE WIZARD ---
    renderProfileWizard() {
        const container = document.getElementById('profile-wizard-container');
        if (!container) return;
        const lang = this.currentLanguage;
        
        const steps = [this.languageData[lang].wizard_personal, this.languageData[lang].wizard_education, this.languageData[lang].wizard_skills, this.languageData[lang].wizard_locations];
        const progressHTML = `
            <div class="wizard-progress-bar">
                ${steps.map((step, index) => `
                    <div class="wizard-progress-step ${index + 1 === this.profileWizardStep ? 'active' : ''} ${index + 1 < this.profileWizardStep ? 'completed' : ''}">
                        <div class="step-circle">${index + 1}</div>
                        <span>${step}</span>
                    </div>
                `).join('')}
            </div>`;

        let contentHTML = '';
        switch(this.profileWizardStep) {
            case 1: contentHTML = this.renderWizardStep1(); break;
            case 2: contentHTML = this.renderWizardStep2(); break;
            case 3: contentHTML = this.renderWizardStep3(); break;
            case 4: contentHTML = this.renderWizardStep4(); break;
        }

        const actionsHTML = `
            <div class="modal-actions">
                ${this.profileWizardStep > 1 ? `<button type="button" class="btn btn--outline" id="wizard-prev-btn">${this.languageData[lang].wizard_previous}</button>` : '<div></div>'}
                ${this.profileWizardStep < steps.length ? `<button type="button" class="btn btn--primary" id="wizard-next-btn">${this.languageData[lang].wizard_next}</button>` : ''}
                ${this.profileWizardStep === steps.length ? `<button type="button" class="btn btn--primary" id="wizard-save-btn">${this.languageData[lang].wizard_save}</button>` : ''}
            </div>`;

        container.innerHTML = progressHTML + contentHTML + actionsHTML;
        this.setupWizardEventListeners();
        if (this.profileWizardStep === 2) {
            document.getElementById('profile-education').addEventListener('change', (e) => {
                const showHigherEd = e.target.value === 'graduate' || e.target.value === 'postgraduate';
                document.getElementById('higher-ed-score-group').classList.toggle('hidden', !showHigherEd);
            });
        }
        if (this.profileWizardStep === 3 || this.profileWizardStep === 4) {
            this.setupMultiSelectListeners();
        }
    }

    setupWizardEventListeners() {
        document.getElementById('wizard-next-btn')?.addEventListener('click', () => this.handleWizardNext());
        document.getElementById('wizard-prev-btn')?.addEventListener('click', () => this.handleWizardPrev());
        document.getElementById('wizard-save-btn')?.addEventListener('click', () => this.saveProfile());
    }

    handleWizardNext() {
        if (!this.validateWizardStep(this.profileWizardStep)) return;
        this.saveStepData(this.profileWizardStep);
        if (this.profileWizardStep < 4) {
            this.profileWizardStep++;
            this.renderProfileWizard();
        }
    }

    handleWizardPrev() {
        if (this.profileWizardStep > 1) {
            this.profileWizardStep--;
            this.renderProfileWizard();
        }
    }
    
    validateWizardStep(step) {
        let isValid = true;
        if (step === 1) {
            ['profile-name', 'profile-email', 'profile-phone'].forEach(id => {
                const input = document.getElementById(id);
                if (!input.value) {
                    input.classList.add('invalid');
                    isValid = false;
                } else {
                    input.classList.remove('invalid');
                }
            });
            if (!isValid) this.showToast('Please fill all personal details.', 'error');
        }
        if (step === 2) {
             const edu = document.getElementById('profile-education');
             if(!edu.value) {
                edu.classList.add('invalid');
                isValid = false;
             } else {
                edu.classList.remove('invalid');
             }
             if (!isValid) this.showToast('Please select your education level.', 'error');
        }
        return isValid;
    }

    saveStepData(step) {
        const p = this.userProfile;
        if (step === 1) {
            p.name = document.getElementById('profile-name').value;
            p.email = document.getElementById('profile-email').value;
            p.phone = document.getElementById('profile-phone').value;
        }
        if (step === 2) {
            p.education = document.getElementById('profile-education').value;
            p.score10th = document.getElementById('profile-score10th').value;
            p.score12th = document.getElementById('profile-score12th').value;
            p.scoreHigher = document.getElementById('profile-scoreHigher').value;
        }
         if (step === 3) {
            p.skills = Array.from(document.querySelectorAll('#profile-skills-component input:checked')).map(cb => cb.value);
            p.interests = Array.from(document.querySelectorAll('#profile-interests-component input:checked')).map(cb => cb.value);
        }
        if (step === 4) {
            p.preferredLocations = Array.from(document.querySelectorAll('#profile-locations-component input:checked')).map(cb => cb.value);
        }
    }
    
    renderWizardStep1() {
        const p = this.userProfile;
        return `
            <div class="profile-wizard-step active">
                <h3 data-en="Personal Information" data-hi="व्यक्तिगत जानकारी">Personal Information</h3>
                <div class="profile-grid">
                    <div class="form-group"><label class="form-label" data-en="Full Name" data-hi="पूरा नाम">Full Name</label><input type="text" id="profile-name" class="form-control" value="${p.name || ''}" required></div>
                    <div class="form-group"><label class="form-label" data-en="Email" data-hi="ईमेल">Email</label><input type="email" id="profile-email" class="form-control" value="${p.email || ''}" required></div>
                    <div class="form-group"><label class="form-label" data-en="Phone" data-hi="फ़ोन">Phone</label><input type="tel" id="profile-phone" class="form-control" value="${p.phone || ''}" required></div>
                </div>
            </div>`;
    }

    renderWizardStep2() {
        const p = this.userProfile;
        const higherEdSelected = p.education === 'graduate' || p.education === 'postgraduate';
        return `
             <div class="profile-wizard-step active">
                <h3 data-en="Educational Qualifications" data-hi="शैक्षणिक योग्यता">Educational Qualifications</h3>
                <div class="profile-grid">
                    <div class="form-group">
                        <label class="form-label" data-en="Highest Education Level" data-hi="उच्चतम शिक्षा स्तर">Highest Education Level</label>
                        <select id="profile-education" class="form-control" required>
                            <option value="">Select...</option>
                            ${this.educationLevels.map(edu => `<option value="${edu.id}" ${p.education === edu.id ? 'selected' : ''}>${this.currentLanguage === 'hi' ? edu.label_hi : edu.label_en}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group"><label class="form-label" data-en="10th Score (%)" data-hi="10वीं का स्कोर (%)">10th Score (%)</label><input type="number" id="profile-score10th" class="form-control" value="${p.score10th || ''}" min="0" max="100"></div>
                    <div class="form-group"><label class="form-label" data-en="12th Score (%)" data-hi="12वीं का स्कोर (%)">12th Score (%)</label><input type="number" id="profile-score12th" class="form-control" value="${p.score12th || ''}" min="0" max="100"></div>
                    <div class="form-group ${higherEdSelected ? '' : 'hidden'}" id="higher-ed-score-group">
                        <label class="form-label" data-en="Higher Education Score (CGPA/%)" data-hi="उच्च शिक्षा स्कोर (सीजीपीए/%)">Higher Education Score (CGPA/%)</label>
                        <input type="text" id="profile-scoreHigher" class="form-control" value="${p.scoreHigher || ''}">
                    </div>
                </div>
            </div>`;
    }

    renderWizardStep3() {
        return `
            <div class="profile-wizard-step active">
                <h3 data-en="Skills & Interests" data-hi="कौशल और रुचियाँ">Skills & Interests</h3>
                <div class="skills-interests-container">
                    ${this.renderMultiSelectComponent('profile-skills', 'Skills', this.categorizedSkillsData[this.currentLanguage], this.userProfile.skills)}
                    ${this.renderMultiSelectComponent('profile-interests', 'Interests', this.interestsData, this.userProfile.interests)}
                </div>
            </div>`;
    }

    renderWizardStep4() {
        return `
            <div class="profile-wizard-step active">
                <h3 data-en="Location Preferences" data-hi="स्थान प्राथमिकताएँ">Location Preferences</h3>
                ${this.renderMultiSelectComponent('profile-locations', 'Preferred Locations', this.locationOptions, this.userProfile.preferredLocations)}
            </div>`;
    }

    // --- END PROFILE WIZARD ---
    
    renderMultiSelectComponent(id, label_en, options, selected) {
        const lang = this.currentLanguage;
        const label_hi = this.languageData[lang][id.replace('profile-', 'wizard_')] || label_en;

        let optionsHTML = '';
        if (Array.isArray(options)) {
            // Flat list for interests and locations
            optionsHTML = options.map(option => `
                <label><input type="checkbox" value="${option}" ${selected.includes(option) ? 'checked' : ''}><span>${option}</span></label>
            `).join('');
        } else {
            // Categorized object for skills
            for (const category in options) {
                optionsHTML += `<h4 class="multi-select-category">${category}</h4>`;
                optionsHTML += options[category].map(option => `
                    <label><input type="checkbox" value="${option}" ${selected.includes(option) ? 'checked' : ''}><span>${option}</span></label>
                `).join('');
            }
        }

        return `
            <div class="form-group">
                <label class="form-label" data-en="${label_en}" data-hi="${label_hi}">${lang === 'hi' ? label_hi : label_en}</label>
                <div class="multi-select-component" id="${id}-component">
                    <div id="${id}-tags" class="multi-select-tags"></div>
                    <div class="multi-select-list-container">
                        <div class="multi-select-list">
                            ${optionsHTML}
                        </div>
                    </div>
                </div>
            </div>`;
    }
    
    setupMultiSelectListeners() {
        ['profile-skills', 'profile-interests', 'profile-locations'].forEach(id => {
            const component = document.getElementById(`${id}-component`);
            if (!component) return;
            component.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                cb.addEventListener('change', () => this.updateMultiSelectTags(id));
            });
            this.updateMultiSelectTags(id);
        });
    }

    updateMultiSelectTags(id) {
        const component = document.getElementById(`${id}-component`);
        const tagsContainer = document.getElementById(`${id}-tags`);
        if (!component || !tagsContainer) return;
        const selected = Array.from(component.querySelectorAll('input:checked')).map(cb => cb.value);
        tagsContainer.innerHTML = selected.map(item => `<span class="multi-select-tag">${item}<button type="button" class="remove-tag" data-value="${item}">&times;</button></span>`).join('');
        tagsContainer.querySelectorAll('.remove-tag').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cb = component.querySelector(`input[value="${e.currentTarget.dataset.value}"]`);
                if (cb) { cb.checked = false; this.updateMultiSelectTags(id); }
            });
        });
    }

    saveProfile() {
        if (!this.validateWizardStep(this.profileWizardStep)) return;
        this.saveStepData(this.profileWizardStep);

        this.saveData();
        this.closeModals();
        this.showToast(this.languageData[this.currentLanguage].profile_complete, 'success');
        if (!this.userProfile.hasCompletedOnboarding) {
            this.userProfile.hasCompletedOnboarding = true;
            this.saveData();
        }
        this.showDashboard();
    }

    isProfileComplete() {
        return this.userProfile.name && this.userProfile.education && this.userProfile.skills.length > 0;
    }

    showOnboardingModal() {
        const onb = document.getElementById('onboarding-modal');
        onb?.classList.remove('hidden');
        this.openModalWithFocus(onb);
    }

    loadStudentDashboard() {
        this.switchDashboardSection('recommendations');
        this.generateRecommendations();
        this.loadApplications();
        this.updateProfileProgress();
        this.renderProfileSection();
    }
    
    switchDashboardSection(section) {
        document.querySelectorAll('.dashboard-section').forEach(sec => sec.classList.toggle('active', sec.id === `${section}-section`));
    }

    updateProfileProgress() {
        const fields = [this.userProfile.name, this.userProfile.email, this.userProfile.phone, this.userProfile.education, this.userProfile.skills.length, this.userProfile.interests.length, this.userProfile.preferredLocations.length];
        const completed = fields.filter(f => f).length;
        const percentage = Math.round((completed / fields.length) * 100);
        document.getElementById('profile-progress-bar').style.width = `${percentage}%`;
        document.getElementById('progress-percentage').textContent = `${percentage}%`;
    }

    renderProfileSection() {
        const container = document.getElementById('profile-container');
        if (!container) return;
        const p = this.userProfile;
        const renderTags = (items, type) => items.length ? items.map(item => `<span class="${type}-tag">${item}</span>`).join('') : '<p>Not specified</p>';
        container.innerHTML = `
            <div class="profile-display">
                <div class="profile-section"><h3>Personal & Education</h3><div class="profile-grid">
                    <div><label>Name</label><p>${p.name || 'N/A'}</p></div>
                    <div><label>Email</label><p>${p.email || 'N/A'}</p></div>
                    <div><label>Phone</label><p>${p.phone || 'N/A'}</p></div>
                    <div><label>Education</label><p>${this.getEducationLabel(p.education) || 'N/A'}</p></div>
                    <div><label>10th Score</label><p>${p.score10th ? p.score10th + '%' : 'N/A'}</p></div>
                    <div><label>12th Score</label><p>${p.score12th ? p.score12th + '%' : 'N/A'}</p></div>
                    ${p.scoreHigher ? `<div><label>Higher Ed. Score</label><p>${p.scoreHigher}</p></div>` : ''}
                </div></div>
                <div class="profile-section"><h3>Skills</h3><div class="tags-container">${renderTags(p.skills, 'skill')}</div></div>
                <div class="profile-section"><h3>Interests</h3><div class="tags-container">${renderTags(p.interests, 'interest')}</div></div>
                <div class="profile-section"><h3>Locations</h3><div class="tags-container">${renderTags(p.preferredLocations, 'location')}</div></div>
                <div class="profile-actions"><button class="btn btn--primary" onclick="portal.showProfileModal()">Edit Profile</button></div>
            </div>`;
    }

    getEducationLabel(id) {
        const level = this.educationLevels.find(l => l.id === id);
        return level ? (this.currentLanguage === 'hi' ? level.label_hi : level.label_en) : '';
    }

    generateRecommendations() {
        const container = document.getElementById('recommendations-container');
        if (!container) return;
        container.innerHTML = `<div class="loading-message">${this.languageData[this.currentLanguage].loading_recommendations}</div>`;
        setTimeout(() => {
            if (!this.isProfileComplete()) {
                container.innerHTML = `<div class="no-applications">Please complete your profile for recommendations.</div>`; return;
            }
            const allRecs = this.calculateEnhancedRecommendations();
            const goodMatches = allRecs.filter(r => r.displayScore >= 20);

            if (goodMatches.length > 0) {
                this.recommendations = goodMatches;
                this.renderRecommendations();
            } else {
                this.renderFallbackRecommendations();
            }
        }, 1500);
    }
    
    renderFallbackRecommendations() {
        const container = document.getElementById('recommendations-container');
        if (!container) return;
        const lang = this.currentLanguage;
        const popular = [...this.internshipsData]
            .sort((a,b) => b.applied_count - a.applied_count)
            .slice(0, 4);

        let html = `
            <div class="fallback-info">
                <h4>${this.languageData[lang].fallback_title}</h4>
                <p>${this.languageData[lang].fallback_body}</p>
            </div>
            <h3>${this.languageData[lang].popular_internships}</h3>
        `;
        html += `<div class="recommendations-grid">${popular.map(rec => this.renderRecommendationCard(rec, false)).join('')}</div>`;
        container.innerHTML = html;
        this.addRecommendationEventListeners();
    }
    
    calculateSkillsScore(internship, user) {
        if (!internship.required_skills.length) return 100;
        let totalScore = 0;
        for (const reqSkill of internship.required_skills) {
            let bestMatch = 0;
            if (user.skills.includes(reqSkill)) {
                bestMatch = 100;
            } else {
                for (const category in this.relatedSkills) {
                    if (this.relatedSkills[category].includes(reqSkill)) {
                        if (user.skills.some(s => this.relatedSkills[category].includes(s))) {
                            bestMatch = Math.max(bestMatch, 70);
                        }
                    }
                }
            }
            totalScore += bestMatch;
        }
        return totalScore / internship.required_skills.length;
    }

    calculateLocationScore(internship, user) {
        if (internship.location === user.homeDistrict) return 100;
        if (this.locationData[user.homeState]?.[user.homeDistrict]?.includes(internship.location)) return 80;
        if (Object.keys(this.locationData).some(state => this.locationData[state][Object.keys(this.locationData[state])[0]].includes(internship.location) && state === user.homeState)) return 50;
        if (user.preferredLocations.includes("Willing to Relocate")) return 25;
        return 0;
    }

    calculateQualificationsScore(internship, user) {
        const userLevel = this.educationHierarchy[user.education];
        const requiredLevels = internship.education_levels.map(l => this.educationHierarchy[l]);
        if (!userLevel || !requiredLevels.length) return 0;
        return requiredLevels.some(reqLevel => userLevel >= reqLevel) ? 100 : 0;
    }

    calculateInterestsScore(internship, user) {
        if (!internship.interests.length) return 100;
        let totalScore = 0;
        for (const int of internship.interests) {
            let bestMatch = 0;
            if (user.interests.includes(int)) {
                bestMatch = 100;
            } else {
                 for (const category in this.relatedInterests) {
                    if (this.relatedInterests[category].includes(int)) {
                        if (user.interests.some(i => this.relatedInterests[category].includes(i))) {
                            bestMatch = Math.max(bestMatch, 50);
                        }
                    }
                }
            }
            totalScore += bestMatch;
        }
        return totalScore / internship.interests.length;
    }

    calculateEnhancedRecommendations() {
        const availableInternships = this.internshipsData.filter(i => !this.dismissedRecommendations.includes(i.id));
        
        const scored = availableInternships.map(internship => {
            const scoreSkills = this.calculateSkillsScore(internship, this.userProfile);
            const scoreLocation = this.calculateLocationScore(internship, this.userProfile);
            const scoreQualifications = this.calculateQualificationsScore(internship, this.userProfile);
            const scoreInterests = this.calculateInterestsScore(internship, this.userProfile);

            const finalScore = (0.40 * scoreSkills) + (0.30 * scoreLocation) + (0.20 * scoreQualifications) + (0.10 * scoreInterests);
            
            let matchReasons = [];
            if (scoreSkills > 50) matchReasons.push("Strong skill alignment");
            if (scoreLocation > 50) matchReasons.push("Good location match");
            if (scoreInterests > 50) matchReasons.push("Aligns with your interests");


            return { ...internship, displayScore: Math.round(finalScore), matchReasons };
        });

        return scored.sort((a, b) => b.displayScore - a.displayScore).slice(0, 5);
    }

    renderRecommendations() {
        const container = document.getElementById('recommendations-container');
        if (!container) return;
        const availableRecs = this.recommendations.filter(r => !this.dismissedRecommendations.includes(r.id));
        if (!availableRecs.length) {
            container.innerHTML = `<div class="no-applications">No recommendations found based on your profile.</div>`; return;
        }
        container.innerHTML = `<div class="recommendation-category"><h3>${this.languageData[this.currentLanguage].perfect_matches}</h3><div class="recommendations-grid">${availableRecs.map(rec => this.renderRecommendationCard(rec, true)).join('')}</div></div>`;
        this.addRecommendationEventListeners();
    }

    renderRecommendationCard(rec, showMatchScore = true) {
        const isBookmarked = this.bookmarks.includes(rec.id);
        const lang = this.currentLanguage;
        const scoreHTML = showMatchScore ? `<div class="recommendation-score"><span class="match-percentage">${rec.displayScore}%</span><span class="match-label">${this.languageData[lang].match_score}</span></div>` : '';
        const reasonsHTML = showMatchScore && rec.matchReasons.length ? `<div class="match-reasons-container"><h5>Why it's a match:</h5><ul class="match-reasons-list">${rec.matchReasons.slice(0, 2).map(r => `<li>- ${r}</li>`).join('')}</ul></div>` : '';

        return `
            <div class="recommendation-card" data-id="${rec.id}">
                <div class="recommendation-header">
                    <div><h4 class="recommendation-title">${rec.title}</h4><p class="recommendation-org">${rec.organization}</p></div>
                    ${scoreHTML}
                </div>
                <div class="recommendation-details">
                    <div class="detail-item">📍 ${rec.location}</div><div class="detail-item">⏱️ ${rec.duration}</div><div class="detail-item">💰 ${rec.stipend}</div>
                </div>
                <p class="recommendation-description">${rec.description}</p>
                ${reasonsHTML}
                <div class="recommendation-actions">
                    <button class="btn btn--primary apply-btn" data-id="${rec.id}">${this.languageData[lang].apply_now}</button>
                    <button class="btn btn--outline bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-id="${rec.id}">${isBookmarked ? this.languageData[lang].bookmarked : this.languageData[lang].bookmark}</button>
                    <button class="btn btn--outline not-interested-btn" data-id="${rec.id}">${this.languageData[lang].not_interested}</button>
                </div>
            </div>`;
    }

    addRecommendationEventListeners() {
        document.querySelectorAll('.apply-btn, .bookmark-btn, .not-interested-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                if (e.currentTarget.classList.contains('apply-btn')) this.showApplicationModal(id);
                else if (e.currentTarget.classList.contains('bookmark-btn')) this.toggleBookmark(id);
                else this.dismissRecommendation(id);
            });
        });
    }

    dismissRecommendation(id) {
        this.dismissedRecommendations.push(id);
        const card = document.querySelector(`.recommendation-card[data-id="${id}"]`);
        if (card) {
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => card.remove(), 500);
        }
        this.showToast(this.languageData[this.currentLanguage].recommendation_hidden, 'info');
    }
    
    showApplicationModal(id) {
        if (!this.isLoggedIn) {
            this.showLoginPage();
            this.showToast(this.languageData[this.currentLanguage].login_prompt, 'info');
            return;
        }

        this.pendingApplication = id;
        const internship = this.internshipsData.find(i => i.id === id);

        if (!this.userProfile.hasCompletedDigitalSkillsQuiz) {
            this.showDigitalSkillsQuiz();
        } else if (internship && internship.skillCheck && internship.skillCheck.length > 0) {
            this.showSkillCheckModal(id);
        }
        else {
            const appModal = document.getElementById('application-modal');
            document.getElementById('application-modal-content').innerHTML = `<h2 id="application-modal-title">Apply for ${internship.title}</h2><p>Confirm application for this role at ${internship.organization}.</p>`;
            appModal.classList.remove('hidden');
            this.openModalWithFocus(appModal);
        }
    }

    openModalWithFocus(modalEl) {
        if (!modalEl) return;
        this._lastFocusedElement = document.activeElement;
        this._currentOpenModal = modalEl;

        modalEl.setAttribute('role', 'dialog');
        modalEl.setAttribute('aria-modal', 'true');
        const title = modalEl.querySelector('h2');
        if (title && title.id) modalEl.setAttribute('aria-labelledby', title.id);
        
        const focusable = modalEl.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
        const first = focusable && focusable.length ? focusable[0] : null;
        if (first) setTimeout(() => first.focus(), 100);

        this._modalKeydownHandler = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                this.closeModals();
                return;
            }
            if (e.key === 'Tab') {
                const nodes = Array.from(focusable);
                if (!nodes.length) return;
                const idx = nodes.indexOf(document.activeElement);
                if (e.shiftKey) {
                    if (idx === 0) { nodes[nodes.length - 1].focus(); e.preventDefault(); }
                } else {
                    if (idx === nodes.length - 1) { nodes[0].focus(); e.preventDefault(); }
                }
            }
        };
        document.addEventListener('keydown', this._modalKeydownHandler);
    }

    
    showConsentModal(skillCheckScore = null) {
        const internship = this.internshipsData.find(i => i.id === this.pendingApplication);
        const consentModal = document.getElementById('consent-modal');
        document.getElementById('consent-profile-data').innerHTML = `<ul><li>Name: ${this.userProfile.name}</li><li>Email: ${this.userProfile.email}</li></ul>`;
        
        // Hide other modals
        document.getElementById('application-modal').classList.add('hidden');
        document.getElementById('skill-check-modal').classList.add('hidden');

        consentModal.classList.remove('hidden');
        this.openModalWithFocus(consentModal);

        // Temporarily store the score to be added to the application
        this._pendingSkillCheckScore = skillCheckScore;
    }
    
    handleConsentAccept() {
        const id = this.pendingApplication;
        const internship = this.internshipsData.find(i => i.id === id);
        
        const applicationData = { 
            id: Date.now(), 
            internshipId: id, 
            internshipTitle: internship.title, 
            organization: internship.organization, 
            appliedDate: new Date().toLocaleDateString(), 
            status: 'submitted', 
            userProfile: this.userProfile
        };

        if (this._pendingSkillCheckScore !== null) {
            applicationData.skillCheckScore = this._pendingSkillCheckScore;
        }

        this.applications.push(applicationData);
        this.saveData(); 
        this.closeModals();
        this.showToast(this.languageData[this.currentLanguage].consent_accepted, 'success');
        this._pendingSkillCheckScore = null; // Clear score
    }

    handleConsentDeny() { this.closeModals(); this.showToast(this.languageData[this.currentLanguage].consent_denied, 'warning'); }
    
    toggleBookmark(id) {
        const index = this.bookmarks.indexOf(id);
        if (index > -1) this.bookmarks.splice(index, 1);
        else this.bookmarks.push(id);
        this.saveData();
        const btn = document.querySelector(`.bookmark-btn[data-id="${id}"]`);
        if (btn) {
            const isBookmarked = this.bookmarks.includes(id);
            btn.classList.toggle('bookmarked', isBookmarked);
            btn.textContent = isBookmarked ? this.languageData[this.currentLanguage].bookmarked : this.languageData[this.currentLanguage].bookmark;
        }
    }

    loadApplications() {
        const container = document.getElementById('applications-container');
        if (!container) return;
        if (!this.applications.length) { container.innerHTML = `<div class="no-applications">No applications yet.</div>`; return; }
        container.innerHTML = this.applications.map(app => `<div class="application-card"><div><h4>${app.internshipTitle}</h4><p>${app.organization}</p></div><div class="application-status status-${app.status}">${app.status}</div></div>`).join('');
    }
    
    // --- ADMIN DASHBOARD FUNCTIONS ---
    loadAdminDashboard() {
        this.switchDashboardSection('admin-analytics');
        this.loadAnalytics();
        this.loadAdminApplications();
        this.loadAdminInternships();
    }

    loadAnalytics() {
        const container = document.getElementById('admin-analytics-container');
        if (!container) return;
        const totalInternships = this.internshipsData.length;
        const totalApplications = this.applications.length;
        const successRate = totalApplications > 0 ? '87%' : 'N/A'; // Mock success rate

        container.innerHTML = `
            <div class="analytics-grid">
                <div class="analytics-card">
                    <h4>Total Internships</h4>
                    <div class="analytics-number">${totalInternships}</div>
                </div>
                <div class="analytics-card">
                    <h4>Total Applications</h4>
                    <div class="analytics-number">${totalApplications}</div>
                </div>
                <div class="analytics-card">
                    <h4>Success Rate</h4>
                    <div class="analytics-number">${successRate}</div>
                </div>
            </div>`;
    }

    loadAdminApplications() {
        const container = document.getElementById('admin-applications-container');
        if (!container) return;
        if (!this.applications.length) {
            container.innerHTML = `<div class="no-applications">No applications have been submitted yet.</div>`;
            return;
        }

        container.innerHTML = this.applications.map(app => {
            const scoreDisplay = app.skillCheckScore !== undefined ? `<span class="applicant-score">Quiz Score: ${app.skillCheckScore}/10</span>` : '';
            return `
            <div class="admin-application-card">
                <div>
                    <h4>${app.userProfile.name}</h4>
                    <p>${app.internshipTitle}</p>
                </div>
                <div>
                    <p><strong>Email:</strong> ${app.userProfile.email}</p>
                    <p><strong>Phone:</strong> ${app.userProfile.phone}</p>
                </div>
                <div class="application-actions">
                    ${scoreDisplay}
                    <button class="btn btn--sm btn--outline" onclick="portal.showApplicantProfile(${app.id})">View Profile</button>
                </div>
            </div>
        `}).join('');
    }

    showApplicantProfile(appId) {
        const application = this.applications.find(app => app.id === appId);
        if (!application) return;
        const p = application.userProfile;
        const renderTags = (items, type) => items.length ? items.map(item => `<span class="${type}-tag">${item}</span>`).join('') : '<p>Not specified</p>';
        
        const content = document.getElementById('admin-profile-content');
        if (content) {
            content.innerHTML = `
                 <div class="profile-display">
                    <div class="profile-section"><h3>Personal & Education</h3><div class="profile-grid">
                        <div><label>Name</label><p>${p.name || 'N/A'}</p></div>
                        <div><label>Email</label><p>${p.email || 'N/A'}</p></div>
                        <div><label>Phone</label><p>${p.phone || 'N/A'}</p></div>
                        <div><label>Education</label><p>${this.getEducationLabel(p.education) || 'N/A'}</p></div>
                        <div><label>10th Score</label><p>${p.score10th ? p.score10th + '%' : 'N/A'}</p></div>
                        <div><label>12th Score</label><p>${p.score12th ? p.score12th + '%' : 'N/A'}</p></div>
                        ${p.scoreHigher ? `<div><label>Higher Ed. Score</label><p>${p.scoreHigher}</p></div>` : ''}
                    </div></div>
                    <div class="profile-section"><h3>Skills</h3><div class="tags-container">${renderTags(p.skills, 'skill')}</div></div>
                    <div class="profile-section"><h3>Interests</h3><div class="tags-container">${renderTags(p.interests, 'interest')}</div></div>
                    <div class="profile-section"><h3>Locations</h3><div class="tags-container">${renderTags(p.preferredLocations, 'location')}</div></div>
                </div>
            `;
        }
        const adminModal = document.getElementById('admin-profile-modal');
        adminModal.classList.remove('hidden');
        this.openModalWithFocus(adminModal);
    }

    loadAdminInternships() {
        const container = document.getElementById('admin-internships-container');
        if (!container) return;

        container.innerHTML = this.internshipsData.map(internship => `
            <div class="admin-internship-card">
                <div class="admin-internship-header">
                    <h4>${internship.title}</h4>
                    <div class="internship-stats">
                        <span class="stat">${internship.applied_count || 0} applications</span>
                        <span class="stat">${internship.total_positions} positions</span>
                    </div>
                </div>
                <p>${internship.organization}</p>
            </div>
        `).join('');
    }

    showAddInternshipModal() {
        const container = document.getElementById('add-internship-form-container');
        container.innerHTML = `
            <form id="add-internship-form" class="add-internship-form">
                <div class="add-internship-grid">
                    <div class="form-group"><label class="form-label" for="internship-title">Title</label><input type="text" id="internship-title" class="form-control" required></div>
                    <div class="form-group"><label class="form-label" for="internship-org">Organization</label><input type="text" id="internship-org" class="form-control" required></div>
                    <div class="form-group"><label class="form-label" for="internship-location">Location</label><input type="text" id="internship-location" class="form-control" required></div>
                    <div class="form-group"><label class="form-label" for="internship-stipend">Stipend</label><input type="text" id="internship-stipend" class="form-control"></div>
                    <div class="form-group"><label class="form-label" for="internship-duration">Duration</label><input type="text" id="internship-duration" class="form-control"></div>
                    <div class="form-group"><label class="form-label" for="internship-positions">Positions</label><input type="number" id="internship-positions" class="form-control" min="1" value="1"></div>
                </div>
                <div class="form-group"><label class="form-label" for="internship-desc">Description</label><textarea id="internship-desc" class="form-control" rows="3"></textarea></div>
                
                <div class="skill-check-builder">
                    <h4>Create Optional Skill Check (up to 10 questions)</h4>
                    <div id="quiz-questions-container"></div>
                    <button type="button" id="add-quiz-question-btn" class="btn btn--outline btn--sm">Add Question</button>
                </div>

                <div class="modal-actions">
                    <button type="button" class="btn btn--outline" onclick="portal.closeModals()">Cancel</button>
                    <button type="submit" class="btn btn--primary">Add Internship</button>
                </div>
            </form>
        `;
        const addModal = document.getElementById('add-internship-modal');
        addModal.classList.remove('hidden');
        this.openModalWithFocus(addModal);
        
        document.getElementById('add-quiz-question-btn').addEventListener('click', () => this.addQuizQuestionField());
        document.getElementById('add-internship-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddNewInternship();
        });
    }

    addQuizQuestionField() {
        const container = document.getElementById('quiz-questions-container');
        const questionCount = container.querySelectorAll('.quiz-question-builder').length;
        if (questionCount >= 10) {
            this.showToast("You can add a maximum of 10 questions.", 'warning');
            return;
        }

        const index = questionCount;
        const questionHTML = `
            <div class="quiz-question-builder">
                <h5>Question ${index + 1}</h5>
                <div class="form-group">
                    <label>Question Text</label>
                    <input type="text" class="form-control" id="quiz-q-${index}-text" placeholder="e.g., What does 'Data Analysis' involve?">
                </div>
                <div class="form-group">
                    <label>Options (comma-separated)</label>
                    <input type="text" class="form-control" id="quiz-q-${index}-options" placeholder="Option A, Option B, Option C">
                </div>
                <div class="form-group">
                    <label>Correct Answer</label>
                    <select class="form-control" id="quiz-q-${index}-correct">
                        <option value="0">Option A</option>
                        <option value="1">Option B</option>
                        <option value="2">Option C</option>
                    </select>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', questionHTML);
    }


    handleAddNewInternship() {
        const newInternship = {
            id: this.internshipsData.length + 1,
            title: document.getElementById('internship-title').value,
            organization: document.getElementById('internship-org').value,
            location: document.getElementById('internship-location').value,
            stipend: document.getElementById('internship-stipend').value,
            duration: document.getElementById('internship-duration').value,
            total_positions: parseInt(document.getElementById('internship-positions').value),
            description: document.getElementById('internship-desc').value,
            required_skills: [],
            interests: [],
            education_levels: ['graduate'],
            applied_count: 0,
            skillCheck: []
        };
        
        const questionsContainer = document.getElementById('quiz-questions-container');
        const questionBuilders = questionsContainer.querySelectorAll('.quiz-question-builder');

        questionBuilders.forEach((q, index) => {
            const text = document.getElementById(`quiz-q-${index}-text`).value;
            const options = document.getElementById(`quiz-q-${index}-options`).value.split(',').map(o => o.trim());
            const correct = parseInt(document.getElementById(`quiz-q-${index}-correct`).value);

            if(text && options.length === 3) {
                newInternship.skillCheck.push({
                    question: text,
                    options: options,
                    correctAnswer: correct
                });
            }
        });

        this.internshipsData.push(newInternship);
        this.loadAdminInternships();
        this.closeModals();
        this.showToast('New internship added successfully!', 'success');
    }
    
    // --- Skill Check Logic ---
    showSkillCheckModal(internshipId) {
        const internship = this.internshipsData.find(i => i.id === internshipId);
        if(!internship || !internship.skillCheck) return;

        const modal = document.getElementById('skill-check-modal');
        const form = document.getElementById('skill-check-form');
        form.innerHTML = ''; // Clear previous quiz

        internship.skillCheck.forEach((q, index) => {
            const questionHTML = `
                <div class="quiz-question">
                    <p>${index + 1}. ${q.question}</p>
                    <div class="quiz-options">
                        ${q.options.map((opt, i) => `
                            <label><input type="radio" name="q${index}" value="${i}"> ${opt}</label>
                        `).join('')}
                    </div>
                </div>`;
            form.insertAdjacentHTML('beforeend', questionHTML);
        });

        const submitBtnHTML = `<button type="submit" class="btn btn--primary btn--full-width">${this.currentLanguage === 'hi' ? 'सबमिट करें' : 'Submit Answers'}</button>`;
        form.insertAdjacentHTML('beforeend', submitBtnHTML);
        
        form.onsubmit = (e) => {
            e.preventDefault();
            this.handleSkillCheckSubmit(internship);
        };
        
        modal.classList.remove('hidden');
        this.openModalWithFocus(modal);
    }
    
    handleSkillCheckSubmit(internship) {
        let score = 0;
        const totalQuestions = internship.skillCheck.length;
        if(totalQuestions === 0) {
             this.showConsentModal();
             return;
        }

        internship.skillCheck.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            if (selected && parseInt(selected.value) === q.correctAnswer) {
                score++;
            }
        });

        const finalScore = (score / totalQuestions) * 10;
        
        this.closeModals();

        let message;
        if (finalScore >= 5) {
            message = this.currentLanguage === 'hi' ? `बढ़िया! आपका स्कोर ${finalScore.toFixed(1)}/10 है। अब आवेदन के लिए आगे बढ़ें।` : `Great job! Your score is ${finalScore.toFixed(1)}/10. Please proceed with your application.`;
            this.showToast(message, 'success');
        } else {
             message = this.currentLanguage === 'hi' ? `आपका स्कोर ${finalScore.toFixed(1)}/10 है। चिंता न करें, यह एक सीखने का अवसर है। आप अभी भी आवेदन कर सकते हैं।` : `Your score is ${finalScore.toFixed(1)}/10. Don't worry, this is a learning opportunity. You can still apply.`;
             this.showToast(message, 'info');
        }

        setTimeout(() => {
            this.showConsentModal(parseFloat(finalScore.toFixed(1)));
        }, 1000);
    }

    showDigitalSkillsQuiz() {
        const modal = document.getElementById('digital-skills-modal');
        const content = document.getElementById('digital-skills-content');
        const lang = this.currentLanguage;

        const quizData = {
            en: {
                title: "Basic Digital Skills Check",
                intro: "Let's quickly check some basic skills needed for most internships. This is a one-time check to help you get started!",
                q1: "What does 'Copy & Paste' usually mean?",
                q1_options: ["Deleting a file", "Duplicating text or a file", "Printing a document"],
                q2: "Please type the following sentence exactly as it appears:",
                q2_text: "The quick brown fox jumps over the lazy dog.",
                q3: "If you need to send your CV (resume), which file type is best?",
                q3_options: ["music.mp3", "photo.jpg", "my_cv.pdf"]
            },
            hi: {
                title: "बुनियादी डिजिटल कौशल जांच",
                intro: "अधिकांश इंटर्नशिप के लिए आवश्यक कुछ बुनियादी कौशलों की शीघ्रता से जाँच करें। यह आपको आरंभ करने में मदद करने के लिए एक बार की जाँच है!",
                q1: "'कॉपी और पेस्ट' का आमतौर पर क्या मतलब होता है?",
                q1_options: ["फ़ाइल हटाना", "टेक्स्ट या फ़ाइल की नकल बनाना", "दस्तावेज़ प्रिंट करना"],
                q2: "कृपया निम्नलिखित वाक्य ठीक वैसा ही टाइप करें जैसा वह दिखाई देता है:",
                q2_text: "The quick brown fox jumps over the lazy dog.",
                q3: "यदि आपको अपना सीवी (रिज्यूमे) भेजने की आवश्यकता है, तो कौन सा फ़ाइल प्रकार सबसे अच्छा है?",
                q3_options: ["music.mp3", "photo.jpg", "my_cv.pdf"]
            }
        };

        content.innerHTML = `
            <h2>${quizData[lang].title}</h2>
            <p>${quizData[lang].intro}</p>
            <form id="digital-skills-form">
                <div class="quiz-question">
                    <p>1. ${quizData[lang].q1}</p>
                    <div class="quiz-options">
                        ${quizData[lang].q1_options.map((opt, i) => `<label><input type="radio" name="q1" value="${i}"> ${opt}</label>`).join('')}
                    </div>
                </div>
                <div class="quiz-question">
                    <p>2. ${quizData[lang].q2}</p>
                    <code>${quizData[lang].q2_text}</code>
                    <input type="text" id="typing-test-input" class="form-control" style="margin-top: 8px;">
                </div>
                <div class="quiz-question">
                    <p>3. ${quizData[lang].q3}</p>
                    <div class="quiz-options">
                        ${quizData[lang].q3_options.map((opt, i) => `<label><input type="radio" name="q3" value="${i}"> ${opt}</label>`).join('')}
                    </div>
                </div>
                <div class="modal-actions" style="justify-content: flex-end;">
                     <button type="submit" class="btn btn--primary">${lang === 'hi' ? 'सबमिट करें' : 'Submit'}</button>
                </div>
            </form>
        `;

        modal.classList.remove('hidden');
        this.openModalWithFocus(modal);

        document.getElementById('digital-skills-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleDigitalSkillsSubmit();
        });
    }

    handleDigitalSkillsSubmit() {
        const correctAnswers = { q1: 1, q3: 2 };
        let allCorrect = true;

        for (const q in correctAnswers) {
            const selected = document.querySelector(`input[name="${q}"]:checked`);
            if (!selected || parseInt(selected.value) !== correctAnswers[q]) {
                allCorrect = false;
                break;
            }
        }
        
        const typingInput = document.getElementById('typing-test-input').value;
        const typingTarget = "The quick brown fox jumps over the lazy dog.";
        if (typingInput !== typingTarget) {
            allCorrect = false;
        }

        if (allCorrect) {
            this.userProfile.hasCompletedDigitalSkillsQuiz = true;
            this.saveData();
            this.closeModals();
            this.showToast(this.currentLanguage === 'hi' ? 'बहुत बढ़िया! आपकी डिजिटल कौशल की जांच हो गई है।' : 'Great job! Your digital skills are checked.', 'success');
            this.showApplicationModal(this.pendingApplication); // Retry the original application flow
        } else {
            this.showToast(this.currentLanguage === 'hi' ? 'कुछ उत्तर गलत हैं। कृपया ध्यान से पढ़ें और फिर से प्रयास करें।' : 'Some answers are incorrect. Please read carefully and try again.', 'error');
        }
    }
    
    setupOfflineSupport() {
        window.addEventListener('online', () => document.getElementById('offline-banner')?.classList.add('hidden'));
        window.addEventListener('offline', () => document.getElementById('offline-banner')?.classList.remove('hidden'));
    }

    saveData() {
        const data = { currentUser: this.currentUser, isLoggedIn: this.isLoggedIn, userType: this.userType, userProfile: this.userProfile, applications: this.applications, bookmarks: this.bookmarks };
        localStorage.setItem('pm_portal_data', JSON.stringify(data));
    }
    
    loadSavedData() {
        try {
            const data = JSON.parse(localStorage.getItem('pm_portal_data'));
            if (data) {
                // Ensure default structure is maintained for userProfile if loading old data
                const defaultProfile = { name: '', email: '', phone: '', education: null, score10th: '', score12th: '', scoreHigher: '', skills: [], interests: [], preferredLocations: [], cvFile: null, cvFileName: null, cvFileSize: null, hasCompletedOnboarding: false, homeDistrict: 'Jaipur', homeState: 'Rajasthan' };
                this.userProfile = { ...defaultProfile, ...data.userProfile };
                
                this.currentUser = data.currentUser;
                this.isLoggedIn = data.isLoggedIn;
                this.userType = data.userType;
                this.applications = data.applications || [];
                this.bookmarks = data.bookmarks || [];
            }
            if (this.isLoggedIn) {
                 setTimeout(() => this.showDashboard(), 100);
            } else {
                 this.showPage('hero-page');
            }
        } catch (e) { 
            console.error('Failed to load data', e);
            this.showPage('hero-page');
        }
    }
    
    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => modal.classList.add('hidden'));
        // remove blur/dim class from body when all modals are closed
        document.body.classList.remove('modal-open');
        // cleanup focus trap and ARIA
        this._cleanupModalAccessibility();
    }

    _cleanupModalAccessibility() {
        if (this._modalKeydownHandler) {
            document.removeEventListener('keydown', this._modalKeydownHandler);
            this._modalKeydownHandler = null;
        }
        if (this._currentOpenModal) {
            this._currentOpenModal.removeAttribute('role');
            this._currentOpenModal.removeAttribute('aria-modal');
            this._currentOpenModal.removeAttribute('aria-labelledby');
            this._currentOpenModal = null;
        }
        if (this._lastFocusedElement) {
            try { this._lastFocusedElement.focus(); } catch (e) {}
            this._lastFocusedElement = null;
        }
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    // --- BROWSE PAGE LOGIC ---
    setupBrowsePage() {
        this.populateBrowseFilters();
        document.getElementById('browse-filter-btn').addEventListener('click', () => this.renderBrowseResults());
    }

    populateBrowseFilters() {
        const lang = this.currentLanguage;
        
        // Populate Education
        const eduSelect = document.getElementById('browse-education');
        if (eduSelect) {
            eduSelect.innerHTML = `<option value="">${lang === 'hi' ? 'सभी स्तर' : 'All Levels'}</option>`;
            eduSelect.innerHTML += this.educationLevels.map(edu => `<option value="${edu.id}">${lang === 'hi' ? edu.label_hi : edu.label_en}</option>`).join('');
        }

        const skillsSelect = document.getElementById('browse-skills');
        if (skillsSelect) {
            skillsSelect.innerHTML = `<option value="">${lang === 'hi' ? 'सभी कौशल' : 'All Skills'}</option>`;
            const categorizedSkills = this.categorizedSkillsData[lang];
            for (const category in categorizedSkills) {
                const optgroup = document.createElement('optgroup');
                optgroup.label = category;
                categorizedSkills[category].forEach(skill => {
                    const option = document.createElement('option');
                    option.value = skill;
                    option.textContent = skill;
                    optgroup.appendChild(option);
                });
                skillsSelect.appendChild(optgroup);
            }
        }
        
        // Populate Interests
        const interestsSelect = document.getElementById('browse-interests');
        if(interestsSelect) {
            interestsSelect.innerHTML = `<option value="">${lang === 'hi' ? 'सभी रुचियाँ' : 'All Interests'}</option>`;
            interestsSelect.innerHTML += this.interestsData.map(interest => `<option value="${interest}">${interest}</option>`).join('');
        }
        
        // Populate Locations
        const locationSelect = document.getElementById('browse-location');
        if(locationSelect) {
            locationSelect.innerHTML = `<option value="">${lang === 'hi' ? 'सभी स्थान' : 'All Locations'}</option>`;
            locationSelect.innerHTML += this.locationOptions.map(loc => `<option value="${loc}">${loc}</option>`).join('');
        }
    }

    renderBrowseResults() {
        const skillsQuery = document.getElementById('browse-skills').value;
        const interestsQuery = document.getElementById('browse-interests').value;
        const educationQuery = document.getElementById('browse-education').value;
        const locationQuery = document.getElementById('browse-location').value;
        
        const results = this.internshipsData.filter(internship => {
            const skillsMatch = !skillsQuery || internship.required_skills.includes(skillsQuery);
            const interestsMatch = !interestsQuery || internship.interests.includes(interestsQuery);
            const educationMatch = !educationQuery || internship.education_levels.includes(educationQuery);
            const locationMatch = !locationQuery || internship.location === locationQuery;

            return skillsMatch && interestsMatch && educationMatch && locationMatch;
        });

        const container = document.getElementById('browse-results');
        if(results.length === 0) {
            container.innerHTML = `<div class="no-applications">${this.currentLanguage === 'hi' ? 'कोई इंटर्नशिप नहीं मिली।' : 'No internships found for the selected criteria.'}</div>`;
            return;
        }
        container.innerHTML = results.map(internship => this.renderBrowseCard(internship)).join('');

        // Add event listeners to the new apply buttons
        container.querySelectorAll('.apply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                this.showApplicationModal(id);
            });
        });
    }

    renderBrowseCard(internship) {
        return `
            <div class="recommendation-card" data-id="${internship.id}">
                <div class="recommendation-header">
                    <div><h4 class="recommendation-title">${internship.title}</h4><p class="recommendation-org">${internship.organization}</p></div>
                </div>
                <div class="recommendation-details">
                    <div class="detail-item">📍 ${internship.location}</div><div class="detail-item">⏱️ ${internship.duration}</div><div class="detail-item">💰 ${internship.stipend}</div>
                </div>
                <p class="recommendation-description">${internship.description}</p>
                <div class="recommendation-actions">
                    <button class="btn btn--primary apply-btn" data-id="${internship.id}">${this.languageData[this.currentLanguage].apply_now}</button>
                </div>
            </div>`;
    }

    // --- CHATBOT LOGIC ---
    setupChatbot() {
        const fab = document.getElementById('chat-fab');
        const window = document.getElementById('chat-window');
        const closeBtn = document.getElementById('chat-close');
        const sendBtn = document.getElementById('chat-send');
        const input = document.getElementById('chat-input');
        
        fab.addEventListener('click', () => {
            window.classList.toggle('hidden');
            document.getElementById('chat-widget').classList.remove('show-tooltip');
            if(!window.classList.contains('hidden')) {
                this.startChatSession();
            }
        });
        closeBtn.addEventListener('click', () => window.classList.add('hidden'));
        sendBtn.addEventListener('click', () => this.handleUserMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserMessage();
        });
    }

    startChatSession() {
        const messagesContainer = document.getElementById('chat-messages');
        const lang = this.currentLanguage;
        const welcome = {
            en: "Hello! I'm PM Sahayak, your personal assistant. How can I help you understand this portal better?",
            hi: "नमस्ते! मैं पीएम सहायक हूं, आपका व्यक्तिगत सहायक। मैं इस पोर्टल को बेहतर ढंग से समझने में आपकी कैसे मदद कर सकता हूं?"
        };
        messagesContainer.innerHTML = `<div class="chat-message bot">${welcome[lang]}</div>`;
        this.showQuickReplies();
    }
    
    showQuickReplies() {
        const repliesContainer = document.getElementById('chat-quick-replies');
        const lang = this.currentLanguage;
        const replies = {
            en: ["What is an internship?", "How do I apply?", "What is a stipend?", "How to fill profile?"],
            hi: ["इंटर्नशिप क्या है?", "मैं आवेदन कैसे करूं?", "स्टाइपेंड क्या है?", "प्रोफ़ाइल कैसे भरें?"]
        };
        repliesContainer.innerHTML = replies[lang].map(text => `<button class="quick-reply-btn">${text}</button>`).join('');
        repliesContainer.querySelectorAll('.quick-reply-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('chat-input').value = btn.textContent;
                this.handleUserMessage();
            });
        });
    }

    addMessage(text, sender) {
        const container = document.getElementById('chat-messages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.textContent = text;
        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    }

    showThinkingIndicator() {
        const container = document.getElementById('chat-messages');
        container.insertAdjacentHTML('beforeend', `
            <div class="chat-message bot" id="thinking-indicator">
                <div class="thinking-indicator"><span></span><span></span><span></span></div>
            </div>
        `);
        container.scrollTop = container.scrollHeight;
    }

    removeThinkingIndicator() {
        document.getElementById('thinking-indicator')?.remove();
    }

    async handleUserMessage() {
        const input = document.getElementById('chat-input');
        const userQuery = input.value.trim();
        if (!userQuery) return;

        this.addMessage(userQuery, 'user');
        input.value = '';
        this.showThinkingIndicator();

        const lang = this.currentLanguage;
        const langInstruction = lang === 'hi' ? 'Respond in simple, clear Hindi.' : 'Respond in simple, clear English.';

        const systemPrompt = `You are 'PM Sahayak', a friendly and patient AI assistant for the PM Internship Scheme portal. Your audience is young students from rural and underserved areas of India, many of whom are first-time mobile and internet users. Your primary goal is to help them understand the portal and the concept of internships.

        **RULES:**
        1.  **Use Simple Language:** Avoid jargon and complex sentences. Be encouraging and supportive.
        2.  **Stay Focused:** Your knowledge is strictly limited to explaining the portal's features (profile, recommendations), internship terms (stipend, duration, unpaid), and the application process.
        3.  **Do Not Hallucinate:** If a question is outside your scope (e.g., "who is the prime minister?", "write me a poem"), politely state that you can only help with questions about the internship portal.
        4.  **Language:** ${langInstruction}`;
        
        try {
            const botResponse = await this.getGeminiResponse(systemPrompt, userQuery);
            this.removeThinkingIndicator();
            this.addMessage(botResponse, 'bot');
            this.showQuickReplies();
        } catch (error) {
            console.error("Gemini API error:", error);
            this.removeThinkingIndicator();
            this.addMessage("I'm sorry, I'm having trouble connecting right now. Please try again later.", "bot");
        }
    }
    
    async getGeminiResponse(systemInstruction, userQuery) {
        // This is a mock function. In a real application, you would make an API call to Gemini.
        return new Promise(resolve => {
            setTimeout(() => {
                const query = userQuery.toLowerCase();
                const lang = this.currentLanguage;

                const responses = {
                    en: {
                        stipend: "A stipend is a fixed amount of money paid to an intern for their work, like a small salary. It helps cover expenses like travel and food.",
                        apply: "To apply for an internship, first complete your profile. Then, go to the 'Recommendations' section, find an internship you like, and click the 'Apply' button.",
                        unpaid: "'Unpaid' means the internship does not offer a stipend or salary. However, these are often valuable for the experience and the certificate you receive.",
                        internship: "An internship is like a short-term job where you can learn new skills and get work experience in a real office. It helps you decide on a career and makes your CV stronger.",
                        profile: "Click on the 'Profile' section in the dashboard. You will see a form to enter your education, skills, and interests. Filling it completely helps us find the best internships for you!",
                        default: "I can help with questions about how to use this portal, what internships are, and how to apply. What would you like to know?"
                    },
                    hi: {
                        स्टाइपेंड: "स्टाइपेंड एक निश्चित राशि है जो एक इंटर्न को उनके काम के लिए दी जाती है, एक छोटे वेतन की तरह। यह यात्रा और भोजन जैसे खर्चों को कवर करने में मदद करता है।",
                        आवेदन: "इंटर्नशिप के लिए आवेदन करने के लिए, पहले अपनी प्रोफ़ाइल पूरी करें। फिर, 'सिफारिशें' अनुभाग में जाएं, अपनी पसंद की इंटर्नशिप ढूंढें, और 'अभी आवेदन करें' बटन पर क्लिक करें।",
                        अवैतनिक: "'अवैतनिक' का मतलब है कि इंटर्नशिप में कोई स्टाइपेंड या वेतन नहीं मिलता है। हालांकि, ये अक्सर अनुभव और प्रमाण पत्र के लिए बहुत मूल्यवान होते हैं।",
                        इंटर्नशिप: "इंटर्नशिप एक छोटी अवधि की नौकरी की तरह है जहाँ आप नए कौशल सीख सकते हैं और एक वास्तविक कार्यालय में काम का अनुभव प्राप्त कर सकते हैं। यह आपको करियर तय करने में मदद करता है और आपके सीवी को मजबूत बनाता है।",
                        प्रोफ़ाइल: "डैशबोर्ड में 'प्रोफ़ाइल' अनुभाग पर क्लिक करें। आपको अपनी शिक्षा, कौशल और रुचियों को दर्ज करने के लिए एक फ़ॉर्म दिखाई देगा। इसे पूरी तरह से भरने से हमें आपके लिए सर्वश्रेष्ठ इंटर्नशिप खोजने में मदद मिलती है!",
                        default: "मैं इस पोर्टल का उपयोग कैसे करें, इंटर्नशिप क्या हैं, और आवेदन कैसे करें, इस बारे में सवालों में मदद कर सकता हूं। आप क्या जानना चाहेंगे?"
                    }
                };
                
                if (query.includes(lang === 'hi' ? 'स्टाइपेंड' : 'stipend')) {
                    resolve(responses[lang].stipend);
                } else if (query.includes(lang === 'hi' ? 'आवेदन' : 'apply')) {
                    resolve(responses[lang].apply);
                } else if (query.includes(lang === 'hi' ? 'अवैतनिक' : 'unpaid')) {
                    resolve(responses[lang].unpaid);
                } else if (query.includes(lang === 'hi' ? 'इंटर्नशिप' : 'internship')) {
                    resolve(responses[lang].internship);
                } else if (query.includes(lang === 'hi' ? 'प्रोफ़ाइल' : 'profile')) {
                    resolve(responses[lang].profile);
                }
                else {
                    resolve(responses[lang].default);
                }
            }, 1500);
        });
    }

}

document.addEventListener('DOMContentLoaded', () => {
    window.portal = new PMInternshipPortal();
    window.portal.init();
});

