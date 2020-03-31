function copyLink(textid) {
    /* Get the text field */
    var copyText = document.getElementById(textid);
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    /* Copy the text inside the text field */
    document.execCommand("copy");
    }
function deleteFile(){
          alert("Are you sure you want to delete this file ?");
}

