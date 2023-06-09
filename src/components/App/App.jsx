import { Component } from "react";
import { Statistic } from '../Statistic/Statistic';
import { Section } from '../Section/Section';
import { Feedback } from '../Feedback/Feedback';
import { Notification } from '../Notification/Notification';
import css from './App.module.css';

export class App extends Component{
  constructor(good,neutral,bad){
    super();
    this.good=good;
    this.neutral= neutral;
    this.bad =bad;
   }

   state = {
    good: 0,
    neutral: 0,
    bad: 0
  }
 
  incrementValue = (e) => {
      this.setState(prevState => {
        return { [e] : prevState[e] + 1 };
      });
  };
    
  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    const total = good + neutral + bad;
    return total;
  };


  countPositiveFeedbackPercentage = total => {
    if (!total) return;
    const { good } = this.state;
    return Math.floor((good / total) * 100);
  };

  
  render () { 
    return (
      <div className={css.wrapper}>
          <Section title="Please leave your feedback:">
        <Feedback
          options={Object.keys(this.state)}
          onLeaveFeedback={this.incrementValue}/>
        
        {this.countTotalFeedback() 
          ?  ( <Statistic 
              good={this.state.good} 
              neutral={this.state.neutral} 
              bad={this.state.bad} 
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage(this.countTotalFeedback())}/>
              ) : (
                <Notification message="There is no feedback yet!" />
                )
              }
         </Section>
      </div>
      
    )
  }
}