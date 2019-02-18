import React, {Component} from 'react'
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const openTime = moment().hour(10).minute(0);
const closeTime = moment().hour(20).minute(0);


export default class Weekly_time_picker extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       closedday: ''
    };
  };
  
  closed_day_change = (e) => {
    this.setState({closedday: e.target.value})
    this.props.change(e)
  }
    render() {
        return(
          <div style={{marginBottom: '30px'}}>
           <div className="choose-times">
            <div className="timing-head">
              <div className="row">
                <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4 center-text">
                 Days
                </div>
                <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4 center-text">
                  Opening time
                </div>
                <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4 center-text">
                  Closing time
                </div>
              </div>
             
            </div>
            <div className="row">
              <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4 day-column">
                <p className="a-day"> <span>Monday</span>  </p> 

                <p className="a-day">Tuesday</p>

                <p className="a-day">Wednesday</p>

                <p className="a-day">Thursday</p>

                <p className="a-day">Friday</p>

                <p className="a-day">Saturday</p>

                <p className="a-day">Sunday</p>

                <p className="a-day red">Closed on</p>

              </div>  

              <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8">
                <div className={`row adjust-time-row ${this.state.closedday == 'Monday' ? 'disable_day animated headShake' : ''}`}>

                  {/* Moday time picker */}
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                    <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={openTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'mondayOpen')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                  
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                  <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={closeTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'mondayClose')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                </div>

                {/* Tuesday time picker */}
                <div className={`row adjust-time-row ${this.state.closedday == 'Tuesday' ? 'disable_day animated headShake' : ''}`}>
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                    <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={openTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'tuesdayOpen')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                  
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                  <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={closeTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'tuesdayClose')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                </div>

                {/* Wednesday timepicker */}
                <div className={`row adjust-time-row ${this.state.closedday == 'Wednesday' ? 'disable_day animated headShake' : ''}`}>
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                    <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={openTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'wednesdayOpen')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                  
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                  <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={closeTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'wednesdayClose')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                </div>

                {/* Thursday timepicker */}
                <div className={`row adjust-time-row ${this.state.closedday == 'Thursday' ? 'disable_day animated headShake' : ''}`}>
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                    <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={openTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'thursdayOpen')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                  
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                  <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={closeTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'thursdayClose')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                </div>

                {/* Friday timepicker */}
                <div className={`row adjust-time-row ${this.state.closedday == 'Friday' ? 'disable_day animated headShake' : ''}`}>
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                    <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={openTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'fridayOpen')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                  
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                  <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={closeTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'fridayClose')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                </div>

                {/* Saturday timepicker */}
                <div className={`row adjust-time-row ${this.state.closedday == 'Saturday' ? 'disable_day animated headShake' : ''}`}>
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                    <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={openTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'saturdayOpen')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                  
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                  <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={closeTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'saturdayClose')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                </div>

                {/* Sunday timepicker */}
                <div className={`row adjust-time-row ${this.state.closedday == 'Sunday' ? 'disable_day animated headShake' : ''}`}>
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                    <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={openTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'sundayOpen')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                  
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                  <p className="a-time">
                      <TimePicker
                        id="timepickerDays"
                        showSecond={false}
                        defaultValue={closeTime}
                        className="xxx"
                        onChange={(value) => this.props.changeProp(value, 'sundayClose')}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </p>
                  </div>
                </div>

                <div>
                  <select className="closed-day" name="closedon" onChange={(e) => this.closed_day_change(e)}>
                    <option value="all">All day open</option>
                    <option value="Sunday" >Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                 </select>
                </div>


               </div>
             </div>
            </div>
          </div>
        )
    }
}