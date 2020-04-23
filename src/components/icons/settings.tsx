import React from 'react'

const Icon = (props: any) => (
  <svg
    width={`${props.width}px`}
    height={`${props.height}px`}
    viewBox={`0 0 ${props.width}px ${props.height}px`}
    version="1.1"
    // xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g id="settings" fill="#F2F2F2">
      <path
        d="M17.9765,10.9042 L17.9895,10.9042 L17.9765,10.9042 Z M8.3365,17.5142 L10.4235,17.5142 L10.8775,16.1612 C10.9355,15.9912 11.0725,15.8612 11.2435,15.8122 C11.6835,15.6872 12.1275,15.5052 12.5665,15.2672 C12.7215,15.1822 12.9085,15.1802 13.0655,15.2592 L14.3305,15.8922 L15.8005,14.4212 L15.1675,13.1582 C15.0875,12.9982 15.0915,12.8082 15.1785,12.6522 C15.3985,12.2552 15.5815,11.8102 15.7225,11.3292 C15.7725,11.1592 15.9035,11.0242 16.0715,10.9682 L17.4345,10.5132 L17.4345,8.4412 L16.0815,7.9872 C15.9125,7.9302 15.7825,7.7932 15.7335,7.6202 C15.6075,7.1792 15.4245,6.7342 15.1895,6.2972 C15.1045,6.1422 15.1025,5.9562 15.1805,5.7982 L15.8125,4.5332 L14.3385,3.0612 L13.0615,3.6852 C12.9055,3.7612 12.7205,3.7582 12.5665,3.6752 C12.1275,3.4382 11.6815,3.2552 11.2435,3.1302 C11.0725,3.0812 10.9355,2.9502 10.8775,2.7812 L10.4235,1.4292 L8.3495,1.4292 L7.8965,2.7812 C7.8395,2.9502 7.7025,3.0812 7.5305,3.1302 C7.0895,3.2562 6.6435,3.4392 6.2065,3.6752 C6.0525,3.7592 5.8675,3.7632 5.7075,3.6832 L4.4325,3.0502 L2.9585,4.5232 L3.5925,5.7992 C3.6705,5.9562 3.6675,6.1422 3.5845,6.2972 C3.3485,6.7342 3.1645,7.1802 3.0385,7.6222 C2.9895,7.7932 2.8595,7.9302 2.6915,7.9872 L1.3375,8.4412 L1.3375,10.5272 L2.6915,10.9802 C2.8585,11.0372 2.9885,11.1722 3.0385,11.3422 C3.1665,11.7812 3.3505,12.2242 3.5845,12.6582 C3.6675,12.8132 3.6705,13.0002 3.5915,13.1572 L2.9595,14.4212 L4.4315,15.8922 L5.6955,15.2592 C5.8535,15.1792 6.0425,15.1832 6.1995,15.2692 C6.6025,15.4922 7.0465,15.6752 7.5215,15.8132 C7.6915,15.8632 7.8275,15.9922 7.8825,16.1612 L8.3365,17.5142 Z M10.8135,18.5982 L7.9485,18.5982 C7.7145,18.5982 7.5075,18.4482 7.4335,18.2292 L6.9435,16.7682 C6.5905,16.6522 6.2505,16.5122 5.9315,16.3522 L4.5665,17.0352 C4.3605,17.1412 4.1075,17.0992 3.9405,16.9342 L1.9165,14.9112 C1.7525,14.7462 1.7115,14.4942 1.8165,14.2862 L2.4985,12.9192 C2.3355,12.5892 2.1975,12.2552 2.0835,11.9202 L0.6225,11.4302 C0.4035,11.3562 0.2535,11.1492 0.2535,10.9162 L0.2535,8.0512 C0.2535,7.8182 0.4035,7.6112 0.6225,7.5372 L2.0815,7.0482 C2.1955,6.7092 2.3345,6.3692 2.5005,6.0352 L1.8155,4.6562 C1.7115,4.4472 1.7525,4.1962 1.9165,4.0312 L3.9405,2.0082 C4.1075,1.8432 4.3605,1.8042 4.5655,1.9072 L5.9445,2.5912 C6.2795,2.4252 6.6185,2.2852 6.9565,2.1732 L7.4455,0.7152 C7.5195,0.4942 7.7265,0.3452 7.9595,0.3452 L10.8135,0.3452 C11.0455,0.3452 11.2525,0.4942 11.3275,0.7152 L11.8175,2.1732 C12.1565,2.2852 12.4945,2.4252 12.8305,2.5922 L14.2105,1.9182 C14.4135,1.8172 14.6655,1.8562 14.8315,2.0212 L16.8555,4.0432 C17.0195,4.2092 17.0615,4.4602 16.9555,4.6692 L16.2735,6.0352 C16.4395,6.3692 16.5795,6.7092 16.6905,7.0482 L18.1495,7.5372 C18.3705,7.6112 18.5195,7.8182 18.5195,8.0512 L18.5195,10.9042 C18.5195,11.1372 18.3705,11.3442 18.1485,11.4182 L16.6775,11.9082 C16.5595,12.2642 16.4195,12.6032 16.2615,12.9212 L16.9445,14.2852 C17.0495,14.4942 17.0075,14.7462 16.8435,14.9112 L14.8205,16.9342 C14.6545,17.0992 14.4015,17.1412 14.1945,17.0352 L12.8285,16.3522 C12.4935,16.5182 12.1545,16.6582 11.8165,16.7702 L11.3275,18.2292 C11.2525,18.4482 11.0455,18.5982 10.8135,18.5982 L10.8135,18.5982 Z"
        id="Fill-3"
      ></path>
      <path
        d="M9.3798,6.7387 C7.8728,6.7387 6.6478,7.9647 6.6478,9.4717 C6.6478,10.9787 7.8728,12.2047 9.3798,12.2047 C10.8878,12.2047 12.1128,10.9787 12.1128,9.4717 C12.1128,7.9647 10.8878,6.7387 9.3798,6.7387 M9.3798,13.2887 C7.2758,13.2887 5.5638,11.5757 5.5638,9.4717 C5.5638,7.3667 7.2758,5.6547 9.3798,5.6547 C11.4838,5.6547 13.1968,7.3667 13.1968,9.4717 C13.1968,11.5757 11.4838,13.2887 9.3798,13.2887"
        id="Fill-4"
      ></path>
    </g>
  </svg>
)

export default Icon
