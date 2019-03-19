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

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      closedday: this.props.closedon
    })
  }
  
  closed_day_change = (e) => {
    this.setState({closedday: e.target.value})
    this.props.change(e)
  }
    render() {
      console.log('.aasda', this.props.mondayOpen);
      
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
                        key={this.props.mondayOpen}
                        defaultValue={this.props.mondayOpen != null ? moment(this.props.mondayOpen) : openTime}
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
                        key={this.props.mondayClose}
                        defaultValue={this.props.mondayClose == null ? closeTime : moment(this.props.mondayClose)}
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
                        key={this.props.tuesdayOpen}
                        defaultValue={this.props.tuesdayOpen == null ? closeTime : moment(this.props.tuesdayOpen)}
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
                        key={this.props.tuesdayClose}
                        defaultValue={this.props.tuesdayClose == null ? closeTime : moment(this.props.tuesdayClose)}
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
                        key={this.props.wednesdayOpen}
                        defaultValue={this.props.wednesdayOpen == null ? openTime : moment(this.props.wednesdayOpen)}
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
                        key={this.props.wednesdayClose}
                        defaultValue={this.props.wednesdayClose == null ? closeTime : moment(this.props.wednesdayClose)}
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
                        key={this.props.thursdayOpen}
                        defaultValue={this.props.thursdayOpen == null ? openTime : moment(this.props.thursdayOpen)}
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
                        key={this.props.thursdayClose}
                        defaultValue={this.props.thursdayClose == null ? closeTime : moment(this.props.thursdayClose)}
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
                        key={this.props.fridayOpen}
                        defaultValue={this.props.fridayOpen == null ? openTime : moment(this.props.fridayOpen)}
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
                        key={this.props.fridayClose}
                        defaultValue={this.props.fridayClose == null ? closeTime : moment(this.props.fridayClose)}
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
                        key={this.props.saturdayOpen}
                        defaultValue={this.props.saturdayOpen == null ? openTime : moment(this.props.saturdayOpen)}
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
                        key={this.props.saturdayClose}
                        defaultValue={this.props.saturdayClose == null ? closeTime : moment(this.props.saturdayClose)}
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
                        key={this.props.sundayOpen}
                        defaultValue={this.props.sundayOpen == null ? openTime : moment(this.props.sundayOpen)}
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
                        key={this.props.sundayClose}
                        defaultValue={this.props.sundayClose == null ? closeTime : moment(this.props.sundayClose)}
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
                  <select className="closed-day" defaultValue={this.props.closedon} name="closedon" onChange={(e) => this.closed_day_change(e)}>
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