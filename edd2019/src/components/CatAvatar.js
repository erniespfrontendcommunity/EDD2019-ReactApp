import React, { Component } from 'react';
import gGetAvatarColor from '@graficos/avatar-color';

const attributesToFacialFeaturesMap = {
  ears: 'stealth',
  eyeLips: 'dexterity',
  smile: ['intelligence', 'evilness'],
  tongue: 'cuteness',
  distortion: 'chaosLevel'
}

export default class CatAvatar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      color: this.setColor(props)
    }
  }

  componentDidUpdate(oldProps) {
    if (
      oldProps
      && (this.props.catName !== oldProps.catName
        || this.props.cuteness !== oldProps.cuteness
        || this.props.evilness !== oldProps.evilness
        || this.props.stealth !== oldProps.stealth)
    ) {
      this.setState({
        color: this.setColor(this.props)
      })
    }
  }

  setColor = (props) => {
    const color = gGetAvatarColor(props.catName)
    return color
  }

  /**
   * Gets a value between the max and the min provided.
   * Factor is a value from 0 to 20
   * all values will be inversely related
  */
  inRangeValue = (min, max, factor) => {
    factor = factor || 1;
    const calc = ((max - min) / factor) + min;
    return isFinite(calc) ? calc : max;
  }

  render() {
    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        height={this.props.height}
        viewBox="0 160 595.3 700"
        enableBackground="new 0 160 595.3 700"
        xmlSpace="preserve"
      >
        <filter id="displacementFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.05"
            numOctaves={this.props[attributesToFacialFeaturesMap.distortion] || 0}
            result="turbulence"
          />
          <feDisplacementMap
            in2="turbulence"
            in="SourceGraphic"
            scale={this.inRangeValue(0, 20, this.props[attributesToFacialFeaturesMap.distortion]) || 1}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <path
          className="cat-body"
          fill={this.state.color}
          style={{
            filter: 'url(#displacementFilter)'
          }}
          d="M495.4,291.5H99.9c-29.2,0-52.9,18.9-52.9,42.2v401c0,23.3,23.7,42.2,52.9,42.2h395.4
          c29.2,0,52.9-18.9,52.9-42.2v-401C548.3,310.4,524.5,291.5,495.4,291.5z"
        />
        <path
          className="ear2"
          fill={this.state.color}
          style={{
            filter: 'url(#displacementFilter)'
          }}
          d="M359,356.2c66-136.5,85.7-113.4,91.8-107.4c13.8,13.8,44.7,107.4,44.7,107.4H359z"
          transform={'translate(0, ' + this.inRangeValue(-30, 0, this.props[attributesToFacialFeaturesMap.ears]) + ')'}
        />
        <path
          className="ear1"
          fill={this.state.color}
          style={{
            filter: 'url(#displacementFilter)'
          }}
          d="M236.4,356.2c-66-136.5-85.7-113.4-91.8-107.4c-13.8,13.8-44.7,107.4-44.7,107.4H236.4z"
          transform={'translate(0, ' + this.inRangeValue(-30, 0, this.props[attributesToFacialFeaturesMap.ears]) + ')'}
        />
        <ellipse
          className="eye1"
          fill="#282828"
          cx="168.2"
          cy="436.8"
          rx="32.1"
          ry="31.1"
        />
        <ellipse
          className="eye2"
          fill="#282828"
          cx="427.2"
          cy="436.8"
          rx="32.1"
          ry="31.1"
        />
        <ellipse
          className="bright-eye2"
          fill="#EFEFEF"
          cx="437.3"
          cy="423"
          rx="6.3"
          ry="6.2"
        />
        <ellipse
          className="bright-eye1"
          fill="#EFEFEF"
          cx="178.3"
          cy="423"
          rx="6.3"
          ry="6.2"
        />
        <rect
          className="eye-lip1" x="126.7" y="450.4"
          transform={
            'matrix(0.9787 0.2055 -0.2055 0.9787 100.1473 ' +
            this.inRangeValue(-120, -86, this.props[attributesToFacialFeaturesMap.eyeLips]) +
            ')'
          }
          fill={this.state.color}
          width="99.2"
          height="37.2"
        />
        <rect
          className="eye-lip2" x="373.9" y="362.9"
          transform={
            'matrix(0.9787 -0.2055 0.2055 0.9787 -69.3557 ' +
            this.inRangeValue(95, 120, this.props[attributesToFacialFeaturesMap.eyeLips]) +
            ')'
          }
          fill={this.state.color}
          width="99.2"
          height="37.2"
        />
        <path
          className="tongue"
          fill="#D979AF"
          transform={
            'translate(0, ' +
            this.inRangeValue(-20, 0, this.props[attributesToFacialFeaturesMap.tongue]) +
            ')'
          }
          d="M272.4,627v47.5c0,14,11.3,25.3,25.3,25.3c14,0,25.3-11.3,25.3-25.3V627H272.4z"
        />
        <path
          className="nose"
          fill="#EFEFEF"
          d="M340.8,521.8c0-7.7-33.9-10.6-43-10.3c-9-0.3-43,2.6-43,10.3c0,20.2,34.3,40,43,40
          C306.5,561.7,340.8,542,340.8,521.8z"
        />
        <ellipse
          className="tongue-cover2"
          fill={this.state.color} cx="352"
          cy="615.6"
          rx="60.3"
          ry="58.6"
        />
        <ellipse
          className="tongue-cover1"
          fill={this.state.color} cx="244.5"
          cy="615.6"
          rx="57.5"
          ry="55.9"
        />
        <path
          className="mouth"
          fill="#EFEFEF"
          d="M392.3,624.3c-0.1,24.8-20.3,44.7-45.1,44.7c-24.8,0-45.1-20.2-45.1-45.1
          c0-13.1-0.1-70.6-0.1-70.6h-8.6c0,0,0,57.5,0,70.6c0,24.8-20.2,45.1-45.1,45.1c-24.8,0-45-20-45.1-44.7c-2.9,0.5-5.8,1.5-8.6,2.5
          c1.5,28.4,25.1,50.9,53.7,50.9c22.2,0,41.3-13.5,49.5-32.7c8.2,19.3,27.3,32.7,49.5,32.7c28.8,0,52.2-22.6,53.7-50.9
          C398.2,625.9,395.2,624.9,392.3,624.3z"
        />
        <ellipse
          className="mouth-cover1"
          fill={this.state.color}
          cx="196.7"
          cy={
            this.inRangeValue(
              575,
              605,
              (((this.props[attributesToFacialFeaturesMap.smile[0]] +
                this.props[attributesToFacialFeaturesMap.smile[1]]) || 1) / 2)
            )
          }
          rx="57.5"
          ry="55.9"
        />
        <ellipse
          className="mouth-cover2"
          fill={this.state.color}
          cx="398.7"
          cy={
            this.inRangeValue(
              575,
              605,
              (((this.props[attributesToFacialFeaturesMap.smile[0]] +
                this.props[attributesToFacialFeaturesMap.smile[1]]) || 1) / 2)
            )
          }
          rx="60.3"
          ry="58.6"
        />
        <g
          className="bigot">
            <rect x="143.8" y="530.5"
              transform="matrix(0.1096 0.994 -0.994 0.1096 693.7234 356.1834)"
              fill="#EFEFEF"
              width="8.6"
              height="69.6"
            />
            <rect x="143.7" y="495.6"
              transform="matrix(-0.2605 0.9655 -0.9655 -0.2605 698.6216 525.6318)"
              fill="#EFEFEF"
              width="8.6"
              height="69.6"
            />
            <rect x="443.1" y="530.4"
              transform="matrix(-0.1096 0.994 -0.994 -0.1096 1058.3169 182.4327)"
              fill="#EFEFEF"
              width="8.6"
              height="69.6"
            />
            <rect x="443.1" y="495.5"
              transform="matrix(0.2605 0.9655 -0.9655 0.2605 842.8879 -39.7695)"
              fill="#EFEFEF"
              width="8.6"
              height="69.6"
            />
        </g>
      </svg>

    )
  }
}
