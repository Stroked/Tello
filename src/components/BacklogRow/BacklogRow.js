import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'emotion/react';

import {
  COLORS,
  UNIT,
  HALF_UNIT,
  HALF_UNIT_PX,
  UNITS_IN_PX,
  ROW_HEIGHT,
  ROW_HEIGHT_PX
} from '../../constants';

import Episode from '../Episode';


const propTypes = {
  show: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    episodes: PropTypes.arrayOf(PropTypes.shape({
      season: PropTypes.number.isRequired,
      episode: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }),
};

const Wrapper = styled.div`
  color: ${COLORS.black};
  background: ${COLORS.white};
  box-shadow: 1px 0px 3px rgba(0,0,0,0.9);
`;

const Row = styled.div`
  display: flex;
  height: ${ROW_HEIGHT_PX};
`;

const ShowImage = styled.img`
  display: block;
  width: ${ROW_HEIGHT_PX};
  height: ${ROW_HEIGHT_PX};
  border: 2px solid ${COLORS.white};
  object-fit: cover;
  object-position: top center;
`;

const ShowDetails = styled.div`
  display: block;
  padding: ${UNITS_IN_PX[1]};
  width: ${UNITS_IN_PX[15]};
  box-shadow: 0px 1px 6px rgba(0,0,0,0.4);
`;

const ShowName = styled.h4`
  font-size: 22px;
  font-weight: bold;
  margin-top: -5px;
  margin-bottom: 3px;
`;

const getTagBackgroundColor = tag => {
  switch (tag) {
    case 'Reality': return COLORS.blue.dark;
    default: return COLORS.gray.dark;
  }
}

const TypeTag = styled.span`
  display: inline-block;
  font-size: 10px;
  color: ${COLORS.white};
  background: ${props => getTagBackgroundColor(props.children)};
  padding: 4px 6px;
`;

const EpisodeWrapper = styled.div`
  position: relative;
  flex: 1;
  padding: ${HALF_UNIT_PX};
  margin-right: ${HALF_UNIT_PX};
  overflow: hidden;
  white-space: nowrap;
  padding-left: ${HALF_UNIT + 2 + 'px'};
`;

const EpisodeGradient = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50px;
  pointer-events: none;
  background: linear-gradient(left, rgba(255,255,255,0), rgba(255,255,255,0.8));
`;

class BacklogRow extends Component {
  static propTypes = propTypes

  render() {
    const { show: { image, name, episodes } } = this.props;

    return (
      <Wrapper>
        <Row>
          <ShowDetails>
            <ShowName>{name}</ShowName>
            <TypeTag>Reality</TypeTag>
          </ShowDetails>

          <EpisodeWrapper>
            <EpisodeGradient />
            {episodes.slice(0, 4).map(episode => (
              <Episode
                height={ROW_HEIGHT - UNIT}
                season={episode.season}
                number={episode.number}
                name={episode.name}
                airDate={episode.airdate}
              />
            ))}
          </EpisodeWrapper>
        </Row>
      </Wrapper>
    );
  }
}

export default BacklogRow;
