import React from "react";
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import {logo} from './logo'

const businessData = JSON.parse(localStorage.getItem('userdata')).data
console.log(businessData);


const largeText = 15
const medText = 11
const smallText = 8

export default class generatePdf {

  static OrderReciept = (props) => {
    const order = props.order
    const user = props.user

    let itemRow = []
    order.items.map(item => {
      itemRow.push([item.itemname, item.count, `$${item.itemprice}`])
    })

    const totalAmount = order.paymentinfo.amount / 100
    const isPaid = order.paymentinfo.status == 'succeeded' ? 'DONE' : "PENDING"
    itemRow.push(["", "TOTAL", `$${totalAmount}`])
    itemRow.push(["", "PAYMENT", isPaid])

    
    var pdf = new jsPDF()
    pdf.addImage(`${logo}`, 90, 5)
    pdf.setFontSize(largeText)
    pdf.text('Order Receipt', 10, 50)
    pdf.setFontSize(medText)
    pdf.text(`Order ID: ${order._id}`, 10, 55)
    pdf.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 10, 60)
    pdf.text(`Time: ${new Date(order.createdAt).toLocaleTimeString()}`, 40, 60)
    //RIGHT SIDE 
    pdf.setFontSize(largeText)
    pdf.text(`Restaurant / Business`, 145, 50)
    pdf.setFontSize(medText)
    pdf.setFontType('bold')
    pdf.text(`${businessData.businessname}`, 145, 55)
    pdf.setFontType('normal')
    pdf.text(`${businessData.address}`, 145, 60)
    //LEFT SIDE DELIVER TO
    pdf.setFontSize(largeText)
    pdf.text('Deliver To :', 10, 70)
    pdf.setFontSize(medText)
    pdf.setFontType('bold')
    pdf.text(`${user.firstname} ${user.lastname}`, 10, 75)
    pdf.setFontType('normal')
    pdf.text(`${user.address}`, 10, 80)
    pdf.text(`City: ${user.city}`, 10, 85)
    pdf.text(`State: ${user.state}`, 10, 90)
    pdf.text(`Zipcode: ${user.zipcode}`, 10, 95)
    pdf.text(`Mobile: ${user.mobile}`, 10, 100)
    //ORDERED ITMES LIST
    pdf.setFontSize(largeText)
    pdf.text('Ordered Items', 10, 110)
    pdf.setFontSize(medText)
  
    pdf.autoTable({
      head: [['Item', 'Quantity', 'Price']],
      margin: {top: 115},
      body: itemRow
    });

    pdf.setFontSize(medText)
    pdf.text(`Thank you for Ordering - Doublesat.com`, 75, 250)


   pdf.save()
  }

}
