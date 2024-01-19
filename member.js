function skillsMember() {
    var member = document.getElementById("member").value;
    var skill = document.getElementById("skill").value;
    var memberSkill = document.getElementById("memberSkill").value;
    var memberSkill = memberSkill + member + " " + skill + "\n";
    document.getElementById("memberSkill").value = memberSkill;
}