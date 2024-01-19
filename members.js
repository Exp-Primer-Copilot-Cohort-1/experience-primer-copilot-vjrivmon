function skillsMember(){
    var skills = [
        {
            name: 'HTML',
            image: 'https://www.w3.org/html/logo/downloads/HTML5_Logo_256.png',
            link: 'https://www.w3schools.com/html/'
        },
        {
            name: 'CSS',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1024px-CSS3_logo_and_wordmark.svg.png',
            link: 'https://www.w3schools.com/css/'
        },
        {
            name: 'JS',
            image: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
            link: 'https://www.w3schools.com/js/'
        },
        {
            name: 'PHP',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/256px-PHP-logo.svg.png',
            link: 'https://www.w3schools.com/php/'
        },
        {
            name: 'SQL',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/MySQL_Logo.svg/256px-MySQL_Logo.svg.png',
            link: 'https://www.w3schools.com/sql/'
        }
    ];

    var skillsList = document.getElementById('skillsList');
    for(var i = 0; i < skills.length; i++){
        var skill = skills[i];
        var skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.innerHTML = `
            <a href="${skill.link}" target="_blank">
                <img src="${skill.image}">
                <p>${skill.name}</p>
            </a>
        `;
        skillsList.appendChild(skillItem);
    }
}