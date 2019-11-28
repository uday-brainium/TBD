import React from "react";
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import moment from 'moment'
//import {logo} from './logo'

const businessData = JSON.parse(localStorage.getItem('userdata')).data
const titleHead = 18
const largeText = 15
const medText = 11
const smallText = 8

export default class GeneratePdf {

  static Ticket = (event, store) => {

   let itemRow = []
   event.weeklyevent.map((weekData, weekIndex) => 
    weekData != null ?
    itemRow.push([`${Object.values(weekData)[0]} : ${moment(Object.values(weekData)[1]).format('hh:mm a')} - ${moment(Object.values(weekData)[2]).format('hh:mm a')}`])
    :
    ''
  )

  console.log("ITEMROW", itemRow);
  

    var pdf = new jsPDF()

    pdf.setFontSize(largeText)


    pdf.setFont("courier");
    pdf.setFontType("bolditalic");
    pdf.setFontSize(titleHead)
    pdf.text(`${event.title}`, 10, 10);
    pdf.setFontSize(medText)
    pdf.text(`${store.businessname}`, 10, 15)
    pdf.setFont("normal");
    pdf.setFontType("normal");

    //Design for once events
    if(event.eventtype == 'once') {
      pdf.text(`${event.eventonce.date}`, 10, 20)
      pdf.text(`${moment(event.eventonce.starttime).format('hh:mm a')} - `, 10, 25)
      pdf.text(`${moment(event.eventonce.endtime).format('hh:mm a')}`, 30, 25)
    
    //Design for daily events
    } else if(event.eventtype == 'daily') {
      pdf.text(`From : `, 10, 20)
      pdf.text(`${event.eventday.datestart}`, 22, 20)
      pdf.text(`To : `, 10, 25)
      pdf.text(`${event.eventday.dateend}`, 22, 25)
      pdf.text('Time : ', 10, 30)
      pdf.text(`${moment(event.eventday.timestart).format('hh:mm a')} - `, 22, 30)
      pdf.text(`${moment(event.eventday.timeend).format('hh:mm a')}`, 42, 30)
      pdf.text(`Ticket Price: ${event.ticketprice}`, 10, 35)

    //Design for weekly events
    } else if(event.eventtype == 'weekly') {
      pdf.autoTable({
        head: [['Weekly Timing']],
        margin: {top: 20, left: 10},
        body: itemRow
      });
      pdf.text(`Ticket Price: ${event.ticketprice}`, 10, 25)
    }

    //ENTRY PASS
    pdf.setFontSize(largeText)
    pdf.text('ENTRY PASS', 130, 10)
        
    
    

    pdf.save()
  }

}
