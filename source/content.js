/**
 * @file    This file contains javascript code that is injected into the Moodle login page.
 * @author  Omer Horev
 * @since   29/11/2020
 */

/**
 * Fetch the saved ID from the storage.
 * 
 * @param callback Method to be called when ID is feched.
 */
getID = function (callback) {
    chrome.storage.sync.get(['id'], results => {
        callback(results['id'])
    });
}

/**
 * Saves the ID in the storage. 
 * 
 * @param id The ID to save in the storage
 */
setID = function (id) {
    chrome.storage.sync.set({ 'id': id }, results => { });
}

$(document).ready(function () {

    noticeHTML = `
        <style>
            .notice {
                font-family: Tahoma, Ariel, sans-serif;
                font-size: small;
                text-align: center;
                direction: rtl;
                background: #ec2132;
            }
        </style>
        <div class="notice">
            <p>
                <small>
                    הודעה זו שייכת לתוסף Chrome למילוי תעודת הזהות ל-Moodle של אונ' ת"א
                </small>
                <br />
                תעודת הזהות אשר תמולא בעמוד התחברות זה תשמר ותמולא באופן אוטומטי בכניסה הבאה לעמוד
            </p>
        </div>`

    body = $("body")
    idInput = $("input[name=Ecom_User_Pid]")
    submitInput = $("input[type=submit]")

    body.prepend(noticeHTML)

    getID(id => {
        if (id !== undefined) {
            idInput.attr("value", id)
        }
    })

    submitInput.click(function (e) {
        setID(idInput.val())
    })
})  