export interface ChallengeCreate {
  name: string,
  owner: string,
  participants: number[],
  rewards: string[],
  tasks: string[],
}

export interface ChallengeLite {
  id: number;
  owner: {
    username: string
  },
  name: string;
}
