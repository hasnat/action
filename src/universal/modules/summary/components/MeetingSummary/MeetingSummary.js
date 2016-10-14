import React, {PropTypes} from 'react';
import withStyles from 'universal/styles/withStyles';
import {css} from 'aphrodite/no-important';
import appTheme from 'universal/styles/theme/appTheme';

import Type from 'universal/components/Type/Type';
import MeetingMain from 'universal/modules/meeting/components/MeetingMain/MeetingMain';
import MeetingSection from 'universal/modules/meeting/components/MeetingSection/MeetingSection';
import MeetingPhaseHeading from 'universal/modules/meeting/components/MeetingPhaseHeading/MeetingPhaseHeading';
import SummaryEmailPreview from 'universal/modules/meeting/components/SummaryEmailPreview/SummaryEmailPreview';
import SummaryFirstTime from 'universal/modules/meeting/components/SummaryFirstTime/SummaryFirstTime';
import SummaryQuickStats from 'universal/modules/meeting/components/SummaryQuickStats/SummaryQuickStats';

import {makeSuccessExpression} from 'universal/utils/makeSuccessCopy';

import sampleTeamSummary from 'universal/modules/email/helpers/sampleTeamSummary';
import exampleTeam from 'universal/modules/patterns/helpers/exampleTeam';

const MeetingSummary = (props) => {
  const {styles, meeting} = props;
  const {meetingNumber} = meeting;
  return (
    <MeetingMain>
      <MeetingSection flexToFill paddingBottom="2rem">
        <MeetingSection paddingBottom="4rem" paddingTop="4rem">

          <MeetingPhaseHeading>
            Meeting Summary
          </MeetingPhaseHeading>

          <Type align="center" marginBottom="2rem" marginTop="2rem" scale="s5">
            <b>{makeSuccessExpression()}</b>! We worked on{' '}
            <span className={css(styles.highlight)}>7 Agenda Items</span><br />
                                            resulting in <span
            className={css(styles.highlight)}>4 New Projects</span>{' '}
                                            and <span className={css(styles.highlight)}>12 New Actions</span>.<br />
            <span className={css(styles.highlight)}>5 Projects</span> marked as “<b>Done</b>” were archived.
          </Type>

          {meetingNumber === 1 &&
            <MeetingSection paddingBottom="2rem" paddingTop="2rem">
              <SummaryFirstTime />
            </MeetingSection>
          }

          <MeetingSection paddingBottom="2rem" paddingTop="2rem">
            <SummaryQuickStats />
          </MeetingSection>

          <MeetingSection paddingBottom="2rem" paddingTop="2rem">
            <SummaryEmailPreview teamOutcomes={newOutcomes}/>
          </MeetingSection>

        </MeetingSection>
      </MeetingSection>
    </MeetingMain>
  );
};

MeetingSummary.propTypes = {
  meeting: PropTypes.object.isRequired,
  styles: PropTypes.object,
};

MeetingSummary.defaultProps = {
  meeting: exampleTeam
};

const styleThunk = () => ({
  root: {
    width: '100%'
  },

  highlight: {
    color: appTheme.palette.warm,
    fontWeight: 700
  }
});

export default withStyles(styleThunk)(MeetingSummary);