import React from 'react';
import moment from 'moment-timezone';
import './MainHeaderCountDown.css';

// 일반 x,y 좌표로 변경
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

// 카운트다운 테두리 그리는 함수
function describeArc(x, y, radius, startAngle, endAngle) {

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

// 숫자를 다른 범위로 매핑하는 함수
function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// SVG 원을 렌더링하는 컴포넌트
const SVGCircle = ({radius}) => (
    <svg className='countdown-svg'>
        <path fill="none" stroke="#B24C4B" strokeWidth="4" d={describeArc(50, 50, 48, 0, radius)}/>
    </svg>
);

// 카운트다운 컴포넌트
class Countdown extends React.Component {
    state = {
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const now = moment().tz('Asia/Seoul'); // 현재 시간을 KST로 설정
            let then = moment().tz('Asia/Seoul').startOf('day').add(19, 'hours'); // 다음 날 저녁 7시를 KST로 계산

            // 현재 시간이 이미 저녁 7시 이후라면 'then'을 다음 날로 설정
            if (now > then) {
                then = then.add(24, 'hours');
            }

            const countdown = moment(then - now);
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');

            this.setState({hours, minutes, seconds});
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const {hours, minutes, seconds} = this.state;
        const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

        if (!seconds) {
            return null;
        }

        return (
            <div>
                <div className='countdown-wrapper'>
                    {hours && (
                        <div className='countdown-item'>
                            <SVGCircle radius={hoursRadius}/>
                            {hours}
                            <span>hours</span>
                        </div>
                    )}
                    {minutes && (
                        <div className='countdown-item'>
                            <SVGCircle radius={minutesRadius}/>
                            {minutes}
                            <span>minutes</span>
                        </div>
                    )}
                    {seconds && (
                        <div className='countdown-item'>
                            <SVGCircle radius={secondsRadius}/>
                            {seconds}
                            <span>seconds</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

// 메인 컴포넌트
function MainHeaderCountDown(props) {
    return (
        <div>
            <Countdown/>
        </div>
    );
}

export default MainHeaderCountDown;
