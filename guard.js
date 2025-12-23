// guard.js - Global Authentication & Authorization Guard
(function() {
    const userRole = sessionStorage.getItem("loto_user_role");
    const orgId = sessionStorage.getItem("loto_org_id");
    const userName = sessionStorage.getItem("loto_user_name");

    // 1. Check for basic session
    if (!userRole || !orgId || !userName) {
        window.location.href = 'auth.html';
        return;
    }

    // 2. Real-time Authorization Check
    const db = JSON.parse(localStorage.getItem('loto_enterprise_db') || '{}');
    const orgData = db[orgId];
    
    if (orgData) {
        const user = orgData.users.find(u => u.name === userName);
        if (!user || user.isAuthorized !== true) {
            alert("ACCESS DENIED: Your account is awaiting Owner Authorization.");
            sessionStorage.clear();
            window.location.href = 'auth.html';
        }
    } else {
        // If Org doesn't exist yet (except for Owner)
        if (userRole !== 'Owner') {
            sessionStorage.clear();
            window.location.href = 'auth.html';
        }
    }
})();