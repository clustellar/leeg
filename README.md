# Leeg
Handles full scope Leagues and Registration systems using real-time web technologies.

## Models
### namespace | organization | govt body
This is a high level authoring organization that may run multiple leagues.  This is analogous to the NCAA or a university running its class registration on Leeg.

relations:
  - has many leagues
  - has one owner (group)
attributes:
  - name
  - title
  - logo

### league | class | contest
This is the high level rules and regulatory model which will provide the interface on which to instantiate sessions.

relations:
  - has many sessions
  - has one manager (group)
attributes:
  - title
  - banner
  - logo
  - default_rules
  - allow_rule_overrides
  - rating

### session | semester
A specific instance of a league or class which is generally bound to a timeframe or location.  Sessions will start and stop where the league is the container of sessions which should only exist.

relations:
  - has many events
  - has many teams
  - has many schedules
  - has one manager (group)
attributes:
  - subtitle
  - start_date
  - end_date
  - rules
  - rating

### event | game | class
The action taken with some frequency over the course of the session or semester.  Each game can consist of 1 or more teams (as defined by league rules).

relations:
  - has many teams
  - has one schedule
  - has one official (group)
  - belongs to league
attributes:
  - title
  - rating

### team | group | class (of students)
A group for a number of players (1 or more as defined by the league rules) which participate in the games.

relations:
  - has many participants
  - has one captain (group)
  - belongs to league
attributes:
  - name
  - logo
  - avatar
  - points
  - ranking

### participant | player | student | contestent
An individual participant within a team unit tied to a particular user.

relations:
  - has one user
  - belongs to team
attributes:
  - rating
  - ranking
  - position

### schedule
An individual time and location where a particular game or event will take place.

relations:
  - has one location
attributes:
  - datetime

### location
An individual location where a game or event may occur (not tied to a particular time or game until scheduled).

attributes:
  - name
  - address
  - googlemapid
  - poc (group)


### user
The user model.

attributes:
  - name
  - email
  - avatar

### group
The standard group contains many users with a role for role based authorization control.

relations:
  - has many users
  - has many roles
attributes:
  - name
  - description

### roles
An access control (list, read, write, update, delete).

attributes:
  - list
  - read
  - write
  - update
  - delete


