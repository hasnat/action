import React, {PropTypes} from 'react';
import withStyles from 'universal/styles/withStyles';
import {css} from 'aphrodite-local-styles/no-important';

import appTheme from 'universal/styles/theme/appTheme';
import {cashay} from 'cashay';
import makeMeetingUrl from 'universal/utils/makeMeetingUrl';
import Button from 'universal/components/Button/Button';
import CopyShortLink from 'universal/modules/meeting/components/CopyShortLink/CopyShortLink';
import MeetingMain from 'universal/modules/meeting/components/MeetingMain/MeetingMain';
import MeetingSection from 'universal/modules/meeting/components/MeetingSection/MeetingSection';
import MeetingPhaseHeading from 'universal/modules/meeting/components/MeetingPhaseHeading/MeetingPhaseHeading';

const createStartMeetingHandler = (members) => () => {
  const self = members.find(member => member.isSelf);
  if (!self) {
    throw new Error('You are not a member! How can that be?');
  }
  const firstFacilitator = members.find(member => member.isFacilitator);
  const safeFirstFacilitator = firstFacilitator || self;
  const facilitatorId = self.isFacilitator ? self.id : safeFirstFacilitator.id;
  const options = {variables: {facilitatorId}};
  cashay.mutate('startMeeting', options);
};

const MeetingLobby = (props) => {
  const {members, team, styles} = props;
  const {id: teamId, name: teamName} = team;

  const onStartMeetingClick = createStartMeetingHandler(members);
  const shortUrl = makeMeetingUrl(teamId);
  return (
    <MeetingMain>
      {/* */}
      <MeetingSection flexToFill paddingBottom="2rem">
        {/* */}
        <div className={css(styles.root)}>
          <MeetingPhaseHeading>Hi, {teamName} Team!</MeetingPhaseHeading>
          <p className={css(styles.label)}>Share this meeting:</p>
          <div className={css(styles.urlBlock)}>
            <CopyShortLink url={shortUrl}/>
          </div>
          <h2 className={css(styles.prompt)}>Team Facilitator: begin the Check-In round!</h2>
          <Button
            label="Start Meeting"
            onClick={onStartMeetingClick}
            size="largest"
            style="outlined"
            colorPalette="cool"
          />
        </div>
        {/* */}
      </MeetingSection>
      {/* */}
    </MeetingMain>
  );
};

MeetingLobby.propTypes = {
  members: PropTypes.array,
  params: PropTypes.shape({
    teamId: PropTypes.string
  }),
  styles: PropTypes.object,
  team: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  teamId: PropTypes.string,
  teamName: PropTypes.string,
};

const styleThunk = () => ({
  root: {
    textAlign: 'center'
  },

  label: {
    color: appTheme.palette.dark,
    fontSize: appTheme.typography.s3,
    fontWeight: 700,
    margin: '4rem 0 0',
    textTransform: 'uppercase'
  },

  urlBlock: {
    margin: '.5rem 0 4rem',
    verticalAlign: 'middle'
  },

  prompt: {
    color: appTheme.palette.dark,
    margin: '0 0 2rem'
  }
});

export default withStyles(styleThunk)(MeetingLobby);
