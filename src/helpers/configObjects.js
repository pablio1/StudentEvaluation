export function userModulesPermission(userType) {
    switch(userType.toUpperCase()) {
        case "STUDENT":
            return {
                modules: [                    
                    { name: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard" }, 
                    { name: "Notifications", icon: "fas fa-bell", route: "/notifications" },  
                    {
                        name: "Enrollment", icon: "fas fa-edit", route: "/enrollment", 
                        submodules: [
                            {name: "Request Subject", icon: "fas fa-minus", route: "/student/requestsubject" },
                            {name: "Dissolved Subjects", icon: "fas fa-minus", route: "/enrollment/student/dissolved Subjects" }
                        ],
                    },
                    //{ name: "Assessment", icon: "fas fa-cash-register", route: "/assessment" },  
                    //{ name: "Study Load", icon: "fas fa-book-reader", route: "/studentstudyload" },
                    {
                        name: "Prospectus", icon: "fas fa-file", route: "/prospectus",
                        submodules: [
                            {name: "Behind Subject", icon: "fas fa-minus", route: "/prospectus/student/behind" },
                            {name: "Suggestion", icon: "fas fa-minus", route: "/prospectus/student/suggestion" },
                        ], 
                    },    
                    { name: "E Grade", icon: "fas fa-table", route: "/egrade" },
                    { name: "Profile", icon: "fas fa-user", route: "/profile" }                    
                ],
                permissions: [
                    { module: "Profile", view: true, create: false, update: true, delete: false },
                    { module: "Dashboard", view: true, create: false, update: false, delete: false },
                    { module: "Notifications", view: true, create: false, update: false, delete: false },
                    { module: "Enrollment", view: true, create: true, update: true, delete: false },
                    { module: "Assessment", view: true, create: false, update: false, delete: false },
                    { module: "Study Load", view: true, create: false, update: false, delete: false },
                    { module: "E Grade", view: true, create: false, update: false, delete: false }
                ]            
            };        

        case "DEAN":
            return {
                modules: [
                    { name: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard" }, 
                    { name: "Notifications", icon: "fas fa-bell", route: "/notifications" },  
                    { 
                        name: "Enrollment", icon: "fas fa-edit", route: "", 
                        submodules: [
                            {name: "Registration", icon: "fas fa-minus", route: "/enrollment/dean/registration" },
                            {name: "Enrolled Subjects", icon: "fas fa-minus", route: "/enrollment/dean/subjects" },
                            {name: "Promissory", icon: "fas fa-minus", route: "/enrollment/dean/promissory" },
                            {name: "Adjustments", icon: "fas fa-minus", route: "/enrollment/dean/adjustments" },
                            {name: "Tracker", icon: "fas fa-minus", route: "/enrollment/dean/tracker" },
                        ], 
                    }, 
                    { 
                        name: "Schedules", icon: "far fa-calendar-alt", route: "",
                        submodules: [
                            {name: "Department", icon: "fas fa-minus", route: "/schedules/department" },
                            {name: "View All", icon: "fas fa-minus", route: "/schedules/viewall" }
                        ], 
                    },
                    //{ name: "Assessment", icon: "fas fa-cash-register", route: "/assessment" },  
                    { name: "Study Load", icon: "fas fa-book-reader", route: "/staffstudyload" },  
                    //{ name: "E Grade", icon: "fas fa-table", route: "/egrade" }, 
                    { name: "Class List", icon: "fas fa-clipboard-list", route: "/classlist" },  
                    { name: "Teacher's Load", icon: "fas fa-chalkboard-teacher", route: "/teachersload" }, 
                    { name: "Reports", icon: "fas fa-chart-bar", route: "/reports" },
                    { name: "Profile", icon: "fas fa-user", route: "/profile" }
                ],
                permissions: [
                    { module: "Profile", view: true, create: false, update: true, delete: false },
                    { module: "Dashboard", view: true, create: false, update: false, delete: false },
                    { module: "Notifications", view: true, create: true, update: false, delete: false },
                    { module: "Enrollment", view: true, create: true, update: true, delete: false },
                    { module: "Assessment", view: true, create: false, update: false, delete: false },
                    { module: "Study Load", view: true, create: false, update: false, delete: false },
                    { module: "E Grade", view: true, create: false, update: false, delete: false },
                    { module: "Class List", view: true, create: false, update: false, delete: false },
                    { module: "Teacher's Load", view: true, create: false, update: false, delete: false },
                    { module: "Reports", view: true, create: false, update: false, delete: false }
                ]            
            }; 
        
        case "CHAIRPERSON":
        return {
            modules: [
                { name: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard" }, 
                { name: "Notifications", icon: "fas fa-bell", route: "/notifications" },  
                { 
                    name: "Enrollment", icon: "fas fa-edit", route: "", 
                    submodules: [
                        {name: "Registration", icon: "fas fa-minus", route: "/enrollment/dean/registration" },
                        {name: "Enrolled Subjects", icon: "fas fa-minus", route: "/enrollment/dean/subjects" },
                        {name: "Adjustments", icon: "fas fa-minus", route: "/enrollment/dean/adjustments" },
                        {name: "Tracker", icon: "fas fa-minus", route: "/enrollment/dean/tracker" },
                    ], 
                }, 
                { 
                    name: "Schedules", icon: "far fa-calendar-alt", route: "",
                    submodules: [
                        {name: "Department", icon: "fas fa-minus", route: "/schedules/department" },
                        {name: "View All", icon: "fas fa-minus", route: "/schedules/viewall" }
                    ], 
                },
                //{ name: "Assessment", icon: "fas fa-cash-register", route: "/assessment" },  
                { name: "Study Load", icon: "fas fa-book-reader", route: "/staffstudyload" },  
                //{ name: "E Grade", icon: "fas fa-table", route: "/egrade" }, 
                { name: "Class List", icon: "fas fa-clipboard-list", route: "/classlist" },  
                { name: "Teacher's Load", icon: "fas fa-chalkboard-teacher", route: "/teachersload" }, 
                { name: "Reports", icon: "fas fa-chart-bar", route: "/reports" },
                { name: "Profile", icon: "fas fa-user", route: "/profile" }
            ],
            permissions: [
                { module: "Profile", view: true, create: false, update: true, delete: false },
                { module: "Dashboard", view: true, create: false, update: false, delete: false },
                { module: "Notifications", view: true, create: true, update: false, delete: false },
                { module: "Enrollment", view: true, create: true, update: true, delete: false },
                { module: "Assessment", view: true, create: false, update: false, delete: false },
                { module: "Study Load", view: true, create: false, update: false, delete: false },
                { module: "E Grade", view: true, create: false, update: false, delete: false },
                { module: "Class List", view: true, create: false, update: false, delete: false },
                { module: "Teacher's Load", view: true, create: false, update: false, delete: false },
                { module: "Reports", view: true, create: false, update: false, delete: false }
            ]            
        };

        case "COOR":
            return {
                modules: [
                    { name: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard" }, 
                    { name: "Notifications", icon: "fas fa-bell", route: "/notifications" },  
                    { 
                        name: "Enrollment", icon: "fas fa-edit", route: "", 
                        submodules: [
                            {name: "Registration", icon: "fas fa-minus", route: "/enrollment/dean/registration" },
                            {name: "Enrolled Subjects", icon: "fas fa-minus", route: "/enrollment/dean/subjects" },
                            {name: "Tracker", icon: "fas fa-minus", route: "/enrollment/dean/tracker" }
                        ], 
                    }, 
                    { 
                        name: "Schedules", icon: "far fa-calendar-alt", route: "",
                        submodules: [
                            {name: "Department", icon: "fas fa-minus", route: "/schedules/department" },
                            {name: "View All", icon: "fas fa-minus", route: "/schedules/viewall" }
                        ], 
                    },
                    //{ name: "Assessment", icon: "fas fa-cash-register", route: "/assessment" },  
                    { name: "Study Load", icon: "fas fa-book-reader", route: "/staffstudyload" },  
                    //{ name: "E Grade", icon: "fas fa-table", route: "/egrade" }, 
                    { name: "Class List", icon: "fas fa-clipboard-list", route: "/classlist" }, 
                    { name: "Teacher's Load", icon: "fas fa-chalkboard-teacher", route: "/teachersload" },  
                    { name: "Reports", icon: "fas fa-chart-bar", route: "/reports" },
                    { name: "Profile", icon: "fas fa-user", route: "/profile" }
                ],
                permissions: [
                    { module: "Profile", view: true, create: false, update: true, delete: false },
                    { module: "Dashboard", view: true, create: false, update: false, delete: false },
                    { module: "Notifications", view: true, create: true, update: false, delete: false },
                    { module: "Enrollment", view: true, create: true, update: true, delete: false },
                    { module: "Assessment", view: true, create: false, update: false, delete: false },
                    { module: "Study Load", view: true, create: false, update: false, delete: false },
                    { module: "E Grade", view: true, create: false, update: false, delete: false },
                    { module: "Class List", view: true, create: false, update: false, delete: false },
                    { module: "Teacher's Load", view: true, create: false, update: false, delete: false },
                    { module: "Reports", view: true, create: false, update: false, delete: false }
                ]            
            };  

        case "ACAD":
            return {
                modules: [
                    { name: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard" }, 
                    { name: "Notifications", icon: "fas fa-bell", route: "/notifications" },  
                    { 
                        name: "Enrollment", icon: "fas fa-edit", route: "", 
                        submodules: [
                            //{name: "Registration", icon: "fas fa-minus", route: "/enrollment/dean/registration" },
                            //{name: "Enrolled Subjects", icon: "fas fa-minus", route: "/enrollment/dean/subjects" },
                            {name: "Promissory", icon: "fas fa-minus", route: "/enrollment/dean/promissory" },
                            {name: "Tracker", icon: "fas fa-minus", route: "/enrollment/dean/tracker" }
                        ], 
                    }, 
                    { 
                        name: "Schedules", icon: "far fa-calendar-alt", route: "",
                        submodules: [
                            {name: "View All", icon: "fas fa-minus", route: "/schedules/viewall" }
                        ], 
                    },
                    //{ name: "Assessment", icon: "fas fa-cash-register", route: "/assessment" },  
                    { name: "Study Load", icon: "fas fa-book-reader", route: "/staffstudyload" },  
                    //{ name: "E Grade", icon: "fas fa-table", route: "/egrade" }, 
                    { name: "Class List", icon: "fas fa-clipboard-list", route: "/classlist" },  
                    { name: "Teacher's Load", icon: "fas fa-chalkboard-teacher", route: "/teachersload" }, 
                    { name: "Reports", icon: "fas fa-chart-bar", route: "/reports" },
                    { name: "Profile", icon: "fas fa-user", route: "/profile" }
                ],
                permissions: [
                    { module: "Profile", view: true, create: false, update: true, delete: false },
                    { module: "Dashboard", view: true, create: false, update: false, delete: false },
                    { module: "Notifications", view: true, create: true, update: false, delete: false },
                    { module: "Enrollment", view: true, create: true, update: true, delete: false },
                    { module: "Assessment", view: true, create: false, update: false, delete: false },
                    { module: "Study Load", view: true, create: false, update: false, delete: false },
                    { module: "E Grade", view: true, create: false, update: false, delete: false },
                    { module: "Class List", view: true, create: false, update: false, delete: false },
                    { module: "Teacher's Load", view: true, create: false, update: false, delete: false },
                    { module: "Reports", view: true, create: false, update: false, delete: false }
                ]            
            };  
        
        case "LINKAGE":
            return {
                modules: [
                    { name: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard" }, 
                    { name: "Notifications", icon: "fas fa-bell", route: "/notifications" },  
                    { 
                        name: "Enrollment", icon: "fas fa-edit", route: "", 
                        submodules: [
                            //{name: "Registration", icon: "fas fa-minus", route: "/enrollment/dean/registration" },
                            //{name: "Enrolled Subjects", icon: "fas fa-minus", route: "/enrollment/dean/subjects" },
                            {name: "Tracker", icon: "fas fa-minus", route: "/enrollment/edp/tracker" }
                        ], 
                    }, 
                    //{ name: "Schedules", icon: "far fa-calendar-alt", route: "/schedules"}, 
                    //{ name: "Assessment", icon: "fas fa-cash-register", route: "/assessment" },  
                    { name: "Study Load", icon: "fas fa-book-reader", route: "/staffstudyload" },  
                    { name: "E Grade", icon: "fas fa-table", route: "/egrade" }, 
                    { name: "Class List", icon: "fas fa-clipboard-list", route: "/classlist" }, 
                    { name: "Teacher's Load", icon: "fas fa-chalkboard-teacher", route: "/teachersload" },  
                    { name: "Reports", icon: "fas fa-chart-bar", route: "/reports" },
                    { name: "Profile", icon: "fas fa-user", route: "/profile" }
                ],
                permissions: [
                    { module: "Profile", view: true, create: false, update: true, delete: false },
                    { module: "Dashboard", view: true, create: false, update: false, delete: false },
                    { module: "Notifications", view: true, create: true, update: false, delete: false },
                    { module: "Enrollment", view: true, create: true, update: true, delete: false },
                    { module: "Assessment", view: true, create: false, update: false, delete: false },
                    { module: "Study Load", view: true, create: false, update: false, delete: false },
                    { module: "E Grade", view: true, create: false, update: false, delete: false },
                    { module: "Class List", view: true, create: false, update: false, delete: false },
                    { module: "Teacher's Load", view: true, create: false, update: false, delete: false },
                    { module: "Reports", view: true, create: false, update: false, delete: false }
                ]            
            }; 

        case "ACCOUNTING":
            return {
                modules: [
                    { name: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard" }, 
                    { name: "Notifications", icon: "fas fa-bell", route: "/notifications" },  
                    { 
                        name: "Enrollment", icon: "fas fa-edit", route: "", 
                        submodules: [
                            {name: "Set Balance", icon: "fas fa-minus", route: "/enrollment/accounting/setbalance" },
                            {name: "Tracker", icon: "fas fa-minus", route: "/enrollment/accounting/tracker" },
                        ],
                    },   
                    { name: "Assessment", icon: "fas fa-cash-register", route: "/assessment" },  
                    { name: "Study Load", icon: "fas fa-book-reader", route: "/staffstudyload" },     
                    { name: "Teacher's Load", icon: "fas fa-chalkboard-teacher", route: "/teachersload" },                
                    { name: "Reports", icon: "fas fa-chart-bar", route: "/reports" },
                    { name: "Profile", icon: "fas fa-user", route: "/profile" }
                ],
                permissions: [
                    { module: "Profile", view: true, create: false, update: true, delete: false },
                    { module: "Dashboard", view: true, create: false, update: false, delete: false },
                    { module: "Notifications", view: true, create: true, update: false, delete: false },
                    { module: "Enrollment", view: true, create: true, update: true, delete: false },
                    { module: "Assessment", view: true, create: false, update: false, delete: false },
                    { module: "Reports", view: true, create: false, update: false, delete: false }
                ]            
            }; 
        
        case "CASHIER":
            return {
                modules: [
                    { name: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard" }, 
                    { name: "Notifications", icon: "fas fa-bell", route: "/notifications" },  
                    { 
                        name: "Enrollment", icon: "fas fa-edit", route: "", 
                        submodules: [
                            {name: "Payment", icon: "fas fa-minus", route: "/enrollment/cashier/payment" },
                            {name: "Tracker", icon: "fas fa-minus", route: "/enrollment/cashier/tracker" },
                        ],
                    },  
                    { name: "Assessment", icon: "fas fa-cash-register", route: "/assessment" },
                    { name: "Teacher's Load", icon: "fas fa-chalkboard-teacher", route: "/teachersload" }, 
                    { name: "Reports", icon: "fas fa-chart-bar", route: "/reports" },
                    { name: "Profile", icon: "fas fa-user", route: "/profile" }
                ],
                permissions: [
                    { module: "Profile", view: true, create: false, update: true, delete: false },
                    { module: "Dashboard", view: true, create: false, update: false, delete: false },
                    { module: "Notifications", view: true, create: true, update: false, delete: false },
                    { module: "Enrollment", view: true, create: true, update: true, delete: false },
                    { module: "Assessment", view: true, create: false, update: false, delete: false },
                    { module: "Reports", view: true, create: false, update: false, delete: false }
                ]            
            };   
        
        case "FACULTY":
            return {
                modules: [
                    { name: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard" }, 
                    { name: "Notifications", icon: "fas fa-bell", route: "/notifications" },    
                    //{ name: "Study Load", icon: "fas fa-book-reader", route: "/studyload" },  
                    { name: "E Grade", icon: "fas fa-table", route: "/egrade" }, 
                    //{ name: "Class List", icon: "fas fa-clipboard-list", route: "/classlist" },  
                    { name: "Teacher's Load", icon: "fas fa-chalkboard-teacher", route: "/teachersload" },
                    { name: "Profile", icon: "fas fa-user", route: "/profile" }
                
                ],
                permissions: [
                    { module: "Profile", view: true, create: false, update: true, delete: false },
                    { module: "Dashboard", view: true, create: false, update: false, delete: false },
                    { module: "Notifications", view: true, create: true, update: false, delete: false },                  
                    { module: "Study Load", view: true, create: false, update: false, delete: false },
                    { module: "E Grade", view: true, create: false, update: false, delete: false },
                    { module: "Class List", view: true, create: false, update: false, delete: false },
                    { module: "Teacher's Load", view: true, create: false, update: false, delete: false }
                ]            
            }; 
        
        case "REGISTRAR": 
            return {
                modules: [
                    { name: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard" }, 
                    { name: "Notifications", icon: "fas fa-bell", route: "/notifications" },  
                    { 
                        name: "Enrollment", icon: "fas fa-edit", route: "", 
                        submodules: [
                            {name: "Registration", icon: "fas fa-minus", route: "/enrollment/registrar/registration" },
                            {name: "Tracker", icon: "fas fa-minus", route: "/enrollment/registrar/tracker" },
                        ], 
                    },    
                    { name: "Teacher's Load", icon: "fas fa-chalkboard-teacher", route: "/teachersload" },                
                    { name: "Reports", icon: "fas fa-chart-bar", route: "/reports" },
                    { name: "Profile", icon: "fas fa-user", route: "/profile" }
                ],
                permissions: [
                    { module: "Profile", view: true, create: false, update: true, delete: false },
                    { module: "Dashboard", view: true, create: false, update: false, delete: false },
                    { module: "Notifications", view: true, create: true, update: false, delete: false },
                    { module: "Enrollment", view: true, create: true, update: true, delete: false },                   
                    { module: "Reports", view: true, create: false, update: false, delete: false }
                ]            
            }; 
        
        case "EDP":
            return {
                modules: [
                    { name: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard" }, 
                    { name: "Notifications", icon: "fas fa-bell", route: "/notifications" },  
                    { 
                        name: "Enrollment", icon: "fas fa-edit", route: "", 
                        submodules: [
                            {name: "Tracker", icon: "fas fa-minus", route: "/enrollment/edp/tracker" },
                        ],
                    },    
                    { name: "Study Load", icon: "fas fa-book-reader", route: "/staffstudyload" },  
                    { name: "E Grade", icon: "fas fa-table", route: "/egrade" }, 
                    { name: "Class List", icon: "fas fa-clipboard-list", route: "/classlist" }, 
                    { name: "Teacher's Load", icon: "fas fa-chalkboard-teacher", route: "/teachersload" }, 
                    { name: "Reports", icon: "fas fa-chart-bar", route: "/reports" },                   
                    { name: "Profile", icon: "fas fa-user", route: "/profile" },  
                    { name: "Admin Tools", icon: "fas fa-cogs", route: "/admintools" }, 
                ],
                permissions: [
                    { module: "Profile", view: true, create: false, update: true, delete: false },
                    { module: "Dashboard", view: true, create: false, update: false, delete: false },
                    { module: "Notifications", view: true, create: true, update: false, delete: false },
                    { module: "Enrollment", view: true, create: true, update: true, delete: false },                   
                    { module: "Study Load", view: true, create: false, update: false, delete: false },
                    { module: "E Grade", view: true, create: false, update: false, delete: false },
                    { module: "Admin Tools", view: true, create: true, update: true, delete: true },
                    { module: "Class List", view: true, create: false, update: false, delete: false },
                ]            
            };     
        
        case "ADMIN":
            return {
                modules: [
                    { name: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard" }, 
                    { name: "Notifications", icon: "fas fa-bell", route: "/notifications" },  
                    { name: "Enrollment", icon: "fas fa-edit", route: "/enrollment" },  
                    { name: "Assessment", icon: "fas fa-cash-register", route: "/assessment" },  
                    { name: "Study Load", icon: "fas fa-book-reader", route: "/studyload" },  
                    { name: "E Grade", icon: "fas fa-table", route: "/egrade" }, 
                    { name: "Class List", icon: "fas fa-clipboard-list", route: "/classlist" },  
                    { name: "Teacher's Load", icon: "fas fa-chalkboard-teacher", route: "/teachersload" }, 
                    { name: "Reports", icon: "fas fa-chart-bar", route: "/reports" },
                    { name: "Profile", icon: "fas fa-user", route: "/profile" },
                    { name: "Admin Tools", icon: "fas fa-cogs", route: "/admintools" }, 
                ],
                permissions: [
                    { module: "Profile", view: true, create: true, update: true, delete: true },
                    { module: "Dashboard", view: true, create: true, update: true, delete: true },
                    { module: "Notifications", view: true, create: true, update: true, delete: true },
                    { module: "Enrollment", view: true, create: true, update: true, delete: true },
                    { module: "Assessment", view: true, create: true, update: true, delete: true },
                    { module: "Study Load", view: true, create: true, update: true, delete: true },
                    { module: "E Grade", view: true, create: true, update: true, delete: true },
                    { module: "Class List", view: true, create: true, update: true, delete: true },
                    { module: "Teacher's Load", view: true, create: true, update: true, delete: true },
                    { module: "Reports", view: true, create: true, update: true, delete: true },
                    { module: "Admin Tools", view: true, create: true, update: true, delete: true }
                ]            
            };  

        case "MANAGEMENT":
            return {
                modules: [
                    { name: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard" }, 
                    { name: "Notifications", icon: "fas fa-bell", route: "/notifications" },  
                    { name: "Reports", icon: "fas fa-chart-bar", route: "/reports" },
                    { name: "Profile", icon: "fas fa-user", route: "/profile" },
                ],
                permissions: [
                    { module: "Profile", view: true, create: true, update: true, delete: true },
                    { module: "Dashboard", view: true, create: true, update: true, delete: true },
                    { module: "Notifications", view: true, create: true, update: true, delete: true },
                    { module: "Reports", view: true, create: true, update: true, delete: true },
                ]            
            };  

        default:
            return {
                modules: [],
                permissions: []            
            };  
    }
}

export function enrollmentApprovalStatus() {
    /*
    0 - REGISTERED,
    1 - APPROVED_REGISTRATION_REGISTRAR,
    2 - DISAPPROVED_REGISTRATION_REGISTRAR,
    3 - APPROVED_REGISTRATION_DEAN,
    4 - DISAPPROVED_REGISTRATION_DEAN,
    5 - SELECTING_SUBJECTS,
    6 - APPROVED_BY_DEAN,
    7 - DISAPPROVED_BY_DEAN,
    8 - APPROVED_BY_ACCOUNTING,
    9 - APPROVED_BY_CASHIER,
    10 - OFFICIALLY_ENROLLED,
    11 - WITHDRAWN_ENROLLMENT_BEFORE_START_OF_CLASS,
    12 - WITHDRAWN_ENROLLMENT_START_OF_CLASS,
    13 - CANCELLED
    */
}

export const errToasterOptions = {
    duration: 6000,
    type: 'is-danger',
    position: 'bottom-right',
    dismissible: true,
    closeOnClick: true,
    animate: { in: 'slideInRight', out: 'slideOutRight' }
}

export function requiredEnrollmentCredentials(educLevel) {
    if(educLevel === "col") {
        return [
            { slug_id: "idpic", name: "2x2 ID Picture", required: true, fileformat: ["jpg","png"] },
            { slug_id: "certgmc", name: "Certificate of Good Moral Character", required: false, fileformat: ["pdf"] },
            { slug_id: "lcr", name: "Local Civil Registrar", required: false, fileformat: ["pdf"]  },
            { slug_id: "birthcert", name: "NSO / PSA Birth Certificate", required: false, fileformat: ["pdf"]  },
            { slug_id: "f138", name: "Form 138 / Report Card", required: false, fileformat: ["pdf"]  },
            { slug_id: "tor", name: "Transcript of Records", required: false, fileformat: ["pdf"]  },
            { slug_id: "certtrans", name: "Certificate of Transfer Credential", required: false, fileformat: ["pdf"]  },
            { slug_id: "hondis", name: "Honorable Dismissal Certificate", required: false, fileformat: ["pdf"]  }
        ];
    }
    else if(educLevel === "shs") {
        return [
            { slug_id: "idpic", name: "2x2 ID Picture", required: true, fileformat: ["jpg","png"]  },
            { slug_id: "certgmc", name: "Certificate of Good Moral Character", required: false, fileformat: ["pdf"]  },
            { slug_id: "lcr", name: "Local Civil Registrar", required: false, fileformat: ["pdf"]  },
            { slug_id: "birthcert", name: "NSO / PSA Birth Certificate", required: false, fileformat: ["pdf"]  },
            { slug_id: "f138", name: "Form 138 / Report Card", required: false, fileformat: ["pdf"]  },
            { slug_id: "esc", name: "ESC Grantee Certificate", required: false, fileformat: ["pdf"]  },
            { slug_id: "tor", name: "Transcript of Records", required: false, fileformat: ["pdf"]  },
            { slug_id: "certtrans", name: "Certificate of Transfer Credential", required: false, fileformat: ["pdf"]  },
            { slug_id: "hondis", name: "Honorable Dismissal Certificate", required: false, fileformat: ["pdf"]  }
        ];
    }
    else if(educLevel === "jhs") {
        return [
            { slug_id: "idpic", name: "2x2 ID Picture", required: true, fileformat: ["jpg","png"]  },
            { slug_id: "certgmc", name: "Certificate of Good Moral Character", required: false, fileformat: ["pdf"]  },
            { slug_id: "lcr", name: "Local Civil Registrar", required: false, fileformat: ["pdf"]  },
            { slug_id: "birthcert", name: "NSO / PSA Birth Certificate", required: false, fileformat: ["pdf"]  },
            { slug_id: "f138", name: "Form 138 / Report Card", required: false, fileformat: ["pdf"]  },
            { slug_id: "esc", name: "ESC Grantee Certificate", required: false, fileformat: ["pdf"]  },
            { slug_id: "tor", name: "Transcript of Records", required: false, fileformat: ["pdf"]  },
            { slug_id: "certtrans", name: "Certificate of Transfer Credential", required: false, fileformat: ["pdf"]  },
            { slug_id: "hondis", name: "Honorable Dismissal Certificate", required: false, fileformat: ["pdf"]  }
        ];
    }
    else if(educLevel === "bed") {
        return [
            { slug_id: "idpic", name: "2x2 ID Picture", required: true, fileformat: ["jpg","png"]  },
            { slug_id: "certgmc", name: "Certificate of Good Moral Character", required: false, fileformat: ["pdf"]  },
            { slug_id: "lcr", name: "Local Civil Registrar", required: false, fileformat: ["pdf"]  },
            { slug_id: "birthcert", name: "NSO / PSA Birth Certificate", required: false, fileformat: ["pdf"]  },
            { slug_id: "f138", name: "Form 138 / Report Card", required: false, fileformat: ["pdf"]  },
            { slug_id: "esc", name: "ESC Grantee Certificate", required: false, fileformat: ["pdf"]  },
            { slug_id: "tor", name: "Transcript of Records", required: false, fileformat: ["pdf"]  },
            { slug_id: "certtrans", name: "Certificate of Transfer Credential", required: false, fileformat: ["pdf"]  },
            { slug_id: "hondis", name: "Honorable Dismissal Certificate", required: false, fileformat: ["pdf"]  }
        ];
    }
    else if(educLevel === "law") {
        return [
            { slug_id: "idpic", name: "2x2 ID Picture", required: false, fileformat: ["jpg","png"]  },
            { slug_id: "certgmc", name: "Certificate of Good Moral Character", required: false, fileformat: ["pdf"]  },
            { slug_id: "lcr", name: "Local Civil Registrar", required: false, fileformat: ["pdf"]  },
            { slug_id: "birthcert", name: "NSO / PSA Birth Certificate", required: false, fileformat: ["pdf"]  },
            { slug_id: "admisdoc", name: "Admission Documents", required: true, fileformat: ["pdf"]  },
            { slug_id: "perstate", name: "Personal Statement", required: true, fileformat: ["pdf"]  },
            { slug_id: "apprapp", name: "Approved Application Form", required: true, fileformat: ["pdf"]  },
            { slug_id: "lttracc", name: "Letter of Acceptance", required: true, fileformat: ["pdf"]  },
        ];
    }
    else {
        return null;   
    }
}