import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLBoolean
} from 'graphql';
import GraphQLISO8601Type from 'graphql-custom-datetype';
import {ACTIVE, STUCK, DONE, FUTURE} from 'universal/utils/constants';
import {nonnullifyInputThunk} from '../utils';

export const ProjectStatus = new GraphQLEnumType({
  name: 'ProjectStatus',
  description: 'The status of the project',
  values: {
    [ACTIVE]: {value: ACTIVE},
    [STUCK]: {value: STUCK},
    [DONE]: {value: DONE},
    [FUTURE]: {value: FUTURE}
  }
});

export const Project = new GraphQLObjectType({
  name: 'Project',
  description: 'A long-term project shared across the team, assigned to a single user',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLID), description: 'The unique project id, teamId::shortid'},
    content: {type: GraphQLString, description: 'The body of the project. If null, it is a new project.'},
    isArchived: {
      type: GraphQLBoolean,
      description: 'true if the project has been archived and will not show up in the main area'
    },
    teamId: {
      type: GraphQLID,
      description: 'The id of the team (indexed). Needed for subscribing to archived projects'
    },
    teamMemberId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the team member assigned to this project, or the creator if content is null'
    },
    createdAt: {
      type: GraphQLISO8601Type,
      description: 'The timestamp the project was created'
    },
    createdBy: {
      type: GraphQLID,
      description: 'The userId that created the project'
    },
    updatedAt: {
      type: GraphQLISO8601Type,
      description: 'The timestamp the project was updated'
    },
    status: {type: new GraphQLNonNull(ProjectStatus), description: 'The status of the project'},
    teamSort: {
      type: GraphQLFloat,
      description: 'the per-status sort order for the team dashboard'
    },
    userSort: {
      type: GraphQLFloat,
      description: 'the per-status sort order for the user dashboard'
    },
    agendaId: {
      type: GraphQLID,
      description: 'the agenda item that created this project, if any'
    },
    cursor: {
      type: GraphQLISO8601Type,
      description: 'the pagination cursor (createdAt)',
      resolve({createdAt}) {
        return createdAt;
      }
    }
  })
});

const projectInputThunk = () => ({
  id: {type: GraphQLID, description: 'The unique project ID'},
  isArchived: {type: GraphQLBoolean, description: 'true if the project is archived'},
  content: {type: GraphQLString, description: 'The body of the project. If null, it is a new project.'},
  status: {type: GraphQLID, description: 'The status of the project created'},
  teamMemberId: {type: GraphQLID, description: 'The team member ID of the person creating the project'},
  /*
   * teamSort and userSort are floats because GraphQLInt is a
   * signed 32-bit int, and we want more range.
   */
  teamSort: {
    type: GraphQLFloat,
    description: 'the per-status sort order for the team dashboard'
  },
  userSort: {
    type: GraphQLFloat,
    description: 'the per-status sort order for the user dashboard'
  },
  agendaId: {
    type: GraphQLID,
    description: 'the agenda item that created this project, if any'
  }
});

export const CreateProjectInput =
  nonnullifyInputThunk('CreateProjectInput', projectInputThunk, ['id', 'status', 'teamMemberId']);
export const UpdateProjectInput = nonnullifyInputThunk('UpdateProjectInput', projectInputThunk, ['id']);
