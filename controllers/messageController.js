const utilities = require("../utilities/")
const messageModel = require("../models/message-model")
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const invCont = require("./invController")
require("dotenv").config()


/* ****************************************
*  Account Inbox View
* *************************************** */
async function inboxView(req, res, next) {
    let account_id = res.locals.accountData.account_id
    let nav = await utilities.getNav()
    const itemData = await accountModel.getAccountById(account_id)
    const accountName = `${itemData.account_firstname} ${itemData.account_lastname}`
    let data = await messageModel.getMessage(account_id)
    const table = await utilities.buildInboxTable(data)
    const archived = await utilities.buildArchivedMessagesNumber(data)
    res.render("message/inbox", {
      title: `${accountName} Inbox`,
      nav,
      table,
      archived,
      errors: null, 
    })
  
  }
  
  /* ****************************************
  *  New Message View
  * *************************************** */
  async function newMessageView(req, res, next) {
    let account_id = res.locals.accountData.account_id
    let nav = await utilities.getNav()
    const itemData = await accountModel.getAccountById(account_id)
    let options = await utilities.buildAccountOptions(account_id)
    res.render("message/newMessage", {
      title: "New Message",
      nav,
      options,
      errors: null,
    })
  }
  
  /* ****************************************
  *  Archived Message View
  * *************************************** */
  async function archivedMessageView(req, res, next) {
    let account_id = res.locals.accountData.account_id
    let nav = await utilities.getNav()
    const itemData = await accountModel.getAccountById(account_id)
    const accountName = `${itemData.account_firstname} ${itemData.account_lastname}`
    let data = await messageModel.getMessage(account_id)
    let table = await utilities.buildArchivedTable(data)
    res.render("message/archived", {
    title: `${accountName} Archives`,
    nav,
    table,
    errors: null,
    }) 
  }
  
  /* ****************************************
  *  Process add new message
  * *************************************** */
  async function addMessage(req, res) {
  const {message_to, message_subject, message_body, account_id} = req.body
  const addResult = await messageModel.addNewMessage(message_to, message_subject, message_body, account_id) 
  if(addResult){
  req.flash("notice", `Message sent successfully`) 
  res.status(201).redirect("/message/inbox/") 
  } else {
  req.flash("notice", `Failed to send the message`)
  res.status(501).redirect("message/newMessage/")
  }
  }
  
  /* ****************************************
  *  Build message view
  * *************************************** */
  async function messageView(req, res, next) {
  const message_id = parseInt(req.params.messageId)
  let account_id = res.locals.accountData.account_id
  let nav = await utilities.getNav()
  const newData = await messageModel.getMessageById(message_id, account_id)
  const inboxMessage = await utilities.buildMessageView(newData)
  const reply = await utilities.replyForm(newData)
  const messageSub = `${newData[0].message_subject}`
  res.render("message/messageView", {
  title: messageSub,
  nav,
  inboxMessage,
  reply,
  errors: null,
  message_id: newData[0].message_id,
  }) 
  }

   /* ****************************************
  *  Process mark as read
  * *************************************** */
 async function markAsRead(req, res) {
const {message_id, account_id} = req.body
const markResult = await messageModel.messageRead(message_id)
if(markResult){
req.flash("notice", `Message marked as read`) 
res.status(201).redirect("/message/inbox/") 
} else {
req.flash("notice", `The operation failed`)
res.status(501).redirect("/message/messageView/"+message_id)
}
}

   /* ****************************************
  *  Process archive message
  * *************************************** */
   async function markAsArchived(req, res) {
    const {message_id, account_id} = req.body
    const markResult = await messageModel.archiveMessage(message_id)
    if(markResult){
    req.flash("notice", `Message archived`) 
    res.status(201).redirect("/message/inbox/") 
    } else {
    req.flash("notice", `The operation failed`)
    res.status(501).redirect("/message/messageView/"+message_id)
    }
    }

  /* ****************************************
  *  Process delete message
  * *************************************** */
   async function deleteMessage(req, res) {
    const {message_id, account_id} = req.body
    const markResult = await messageModel.deleteMessage(message_id)
    if(markResult){
    req.flash("notice", `Message deleted`) 
    res.status(201).redirect("/message/inbox/") 
    } else {
    req.flash("notice", `The operation failed`)
    res.status(501).redirect("/message/messageView/"+message_id)
    }
    }


    /* ****************************************
  *  Process reply message
  * *************************************** */
 async function replyMessage(req, res, next) {
  const {message_to, message_subject, message_body, account_id} = req.body
  const addResult = await messageModel.addNewMessage(message_to, message_subject, message_body, account_id) 
  if(addResult){
  req.flash("notice", `Message sent successfully`) 
  res.status(201).redirect("/message/inbox/") 
  } else {
  req.flash("notice", `Failed to send the message`)
  res.status(501).redirect("message/messageView/")
  }
 }


  module.exports = {inboxView, newMessageView, archivedMessageView, addMessage, messageView, markAsRead, markAsArchived, deleteMessage, replyMessage}