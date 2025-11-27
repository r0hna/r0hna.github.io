// Get DOM elements once
const userInput = document.getElementById('user-input');
const commonDiv = document.getElementById('common-div');
const githubDiv = document.getElementById('github-div');
const topParametersDiv = document.getElementById('top_parameters-div');
const socialMediaDiv = document.getElementById('social-media-div');

/**
 * Creates an HTML anchor tag for a dork button.
 * @param {string} url The target URL for the dork query.
 * @param {string} text The display text for the button.
 * @param {string} colorClass The Bootstrap class (e.g., 'btn-outline-danger').
 * @returns {string} The complete HTML string for the button.
 */
function createButton(url, text, colorClass) {
    // We use m-0 since the grid handles spacing
    return `<a class="btn ${colorClass} m-0" target="_blank" href="${url}">${text}</a>`;
}

/**
 * Generates and updates all dork buttons based on the current user input.
 */
function updateDorks() {
    const domain = userInput.value.trim();
    // 'domain' now holds the raw input (e.g., 'testfire.net' or 'https://target.com/test')

    // Clear previous results
    commonDiv.innerHTML = '';
    topParametersDiv.innerHTML = '';
    githubDiv.innerHTML = '';
    socialMediaDiv.innerHTML = '';

    // Only generate dorks if there is input
    if (domain.length > 0) {
        
        // --- Common Dorks (using btn-outline-danger class) ---
        let commonDorks = [
            // Direct file access needs a hardcoded protocol, assuming HTTPS is best effort.
            createButton(`https://${domain}/robots.txt`, 'robots.txt', 'btn-outline-danger'),
            createButton(`https://${domain}/security.txt`, 'security.txt', 'btn-outline-danger'),
            // Google dorks use the 'site:' operator, which handles protocols well.
            createButton(`https://www.google.com/search?q=site:*.*${domain}+OR+site:*.${domain}+OR+site:..*.*${domain}`, 'Subdomains', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+intitle:"index+of"+inurl:ftp+OR+inurl:ssh`, 'Exposed FTP/SSH', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+intitle:"index+of"+OR+intitle:"index+of+/"`, 'Dir Listening', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+ext:doc+OR+ext:docx+OR+ext:pdf+OR+ext:xlsx`, 'Exposed Documents', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+intitle:%22%69%6e%64%65%78%20%6f%66%22%20%2f%65%74%63%2f%70%61%73%73%77%64`, 'Exposed Usernames', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+intitle:%22%69%6e%64%65%78%20%6f%66%22%20%2f%65%74%63%2f%73%68%61%64%6f%77`, 'Exposed Passwords', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+%69%6e%75%72%6c%3a%3f%71%3d%20%7c%20%69%6e%75%72%6c%3a%3f%73%3d%20%7c%20%69%6e%75%72%6c%3a%3f%73%65%61%72%63%68%3d%20%7c%20%69%6e%75%72%6c%3a%3f%69%64%3d%20%7c%20%69%6e%75%72%6c%3a%3f%70%69%64%3d%20%7c%20%69%6e%75%72%6c%3a%3f%63%61%74%65%67%6f%72%79%3d`, 'Parameter URLs', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+ext:log+OR+ext:txt+OR+ext:conf+OR+ext:env+OR+ext:sh+OR+ext:bak+OR+ext:git+OR+ext:htaccess`, 'Interesting Files', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q="${domain}"+site:pastebin.com+OR+site:jsfiddle.net+OR+site:codepen.io`, 'Code Leaks', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+%69%6e%75%72%6c%3a%63%6f%6e%66%69%67%20%7c%20%69%6e%75%72%6c%3a%65%6e%76%20%7c%20%65%78%74%3a%78%6d%6c%20%7c%20%65%78%74%3a%63%6f%6e%66%20%7c%20%65%78%74%3a%74%78%74`, 'Config Files', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+inurl%3A%22email%3D%22%20OR%20inurl%3A%22password%3D%22%20OR%20inurl%3A%22secret%3D%22%20OR%20inurl%3A%22session%3D%22`, 'Juicy URLs', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+ext%3Alog%20%7C%20ext%3Atxt%20%7C%20ext%3Aconf%20%7C%20ext%3Acnf%20%7C%20ext%3Aini%20%7C%20ext%3Aenv%20%7C%20ext%3Abak%20%7C%20ext%3Agit`, 'Juicy Extensions', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+inurl:"upload+file"+OR+inurl:upload`, 'Upload Page', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+intitle:"Apache+HTTP+Server"+OR+inurl:server-status`, 'Apache Server Status', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+intitle:"ngnix"+OR+intitle:"Welcome+to+ngnix!"+OR+inurl:ngnix_status`, 'Ngnix Server Status', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+inurl:/phpMyAdmin/index.php+intitle:phpmyadmin`, 'PhpMyAdmin Page', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+intitle:"index+of"+inurl:/wp-content`, 'Wordpress Dir', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+intitle:"index+of+/"+inurl:/wp-content/plugins`, 'Wordpress Plugins', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+inurl:"admin+Login"+OR+intitle:"Admin+Panel"`, 'Wordpress Admin', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+inurl:login+OR+inurl:logon+OR+inurl:sign-in`, 'Login Page', 'btn-outline-danger'),
            createButton(`https://www.google.com/search?q=site:${domain}+inurl:apidocs+OR+inurl:swagger+OR+inurl:api-explorer`, 'API Doc', 'btn-outline-danger'),
        ];
        commonDiv.innerHTML = commonDorks.join('');

        // --- OWASP Parameters (using btn-outline-info class) ---
        let owaspDorks = [
            createButton(`https://www.google.com/search?q=site:${domain}+inurl:"redirect="+OR+inurl:"return="+OR+inurl:"next="+OR+inurl:"dest="`, 'Open Redirects', 'btn-outline-info'),
            createButton(`https://www.google.com/search?q=site:${domain}+inurl:q=+OR+inurl:s=+OR+inurl:search=+OR+inurl:query=+OR+inurl:keyword=`, 'XSS Prone Parameters', 'btn-outline-info'),
            createButton(`https://www.google.com/search?q=site:${domain}+inurl%3Aid%3D%20OR%20inurl%3Apid%3D%20OR%20inurl%3Acategory%3D%20OR%20inurl%3Acat%3D`, 'SQLi Prone Parameters', 'btn-outline-info'),
            createButton(`https://www.google.com/search?q=site:${domain}+inurl:http+OR+inurl:url=+OR+inurl:path=+OR+inurl:dest=+OR+inurl:page=`, 'SSRF Prone Parameters', 'btn-outline-info'),
            createButton(`https://www.google.com/search?q=site:${domain}+inurl:include+OR+inurl:dir+OR+inurl:file=+OR+inurl:folder=+OR+inurl:conf=`, 'LFI Prone Parameters', 'btn-outline-info'),
            createButton(`https://www.google.com/search?q=site:${domain}+inurl:cmd+OR+inurl:exec=+OR+inurl:query=+OR+inurl:code=+OR+inurl:run=`, 'RCE Prone Parameters', 'btn-outline-info'),
        ];
        topParametersDiv.innerHTML = owaspDorks.join('');

        // --- Github Dorks (using btn-outline-primary class) ---
        let githubDorks = [
            createButton(`https://github.com/search?q=%22${domain}%22+password&type=Code`, 'Password', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+npmrc%20_auth&type=Code`, 'npmrc _auth', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+dockercfg&type=Code`, 'dockercfg', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+pem%20private&type=Code`, 'pem private', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+id_rsa&type=Code`, 'id_rsa', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+aws_access_key_id&type=Code`, 'aws_access_key_id', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+s3cfg&type=Code`, 's3cfg', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+htpasswd&type=Code`, 'htpasswd', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+git-credentials&type=Code`, 'Git-credentials', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+bashrc%20password&type=Code`, 'bashrc password', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+sshd_config&type=Code`, 'sshd_config', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+xoxp%20OR%20xoxb%20OR%20xoxa&type=Code`, 'Slack Tokens', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+SECRET_KEY&type=Code`, 'Secret Key', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+client_secret&type=Code`, 'client_secret', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+github_token&type=Code`, 'github_token', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+api_key&type=Code`, 'api_key', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+FTP&type=Code`, 'FTP Credentials', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+app_secret&type=Code`, 'app_secret', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+passwd&type=Code`, 'passwd file', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+.env&type=Code`, '.env file', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+mysql&type=Code`, 'mysql credentials', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+credentials&type=Code`, 'credentials', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+PWD&type=Code`, 'PWD Variable', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+.bash_history&type=Code`, '.bash_history', 'btn-outline-primary'),
            createButton(`https://github.com/search?q=%22${domain}%22+secrets&type=Code`, 'secrets', 'btn-outline-primary'),
        ];
        githubDiv.innerHTML = githubDorks.join('');

        // --- Social Media Dorks (using btn-outline-secondary class) ---
        let socialDorks = [
            createButton(`https://www.google.com/search?q=site:linkedin.com+"${domain}"`, 'LinkedIn', 'btn-outline-secondary'),
            createButton(`https://www.google.com/search?q=site:facebook.com+"${domain}"`, 'Facebook', 'btn-outline-secondary'),
            createButton(`https://www.google.com/search?q=site:${domain}+intext:@gmail.com+OR+intext:@yahoo.com`, 'eMail Addresses', 'btn-outline-secondary'),
        ];
        socialMediaDiv.innerHTML = socialDorks.join('');
    }
}

// --- Event Listener: Update Dorks on Input Change ---
// Use 'input' event for immediate updates as the user types
userInput.addEventListener('input', updateDorks);

// --- Initialization: Generate Dorks with placeholder on load ---
window.onload = function() {
    // Set placeholder value and generate dorks
    userInput.value = userInput.placeholder; 
    updateDorks();

    // Clear the input after initial load so the user can start typing immediately
    setTimeout(() => {
        userInput.value = '';
        // Clear the generated buttons now that the input is empty
        updateDorks();
    }, 50);
}
