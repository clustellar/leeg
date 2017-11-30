var thinky = require('./rdb')
  , uuid = require('uuid/v4')
  , type = thinky.type
  , r = thinky.r
  , User = require('./User')

var protectedAttributes = ['id', 'createdAt'];

var Leeg = thinky.createModel('Leeg', {
  id: type.string(),
  name: type.string(),
  title: type.string(),
  description: type.string(),
  banner: type.string(),
  logo: type.string(),
  allow_teams_to_request_games: type.boolean(),
  allow_teams_to_approve_games: type.boolean(),
  allow_teams_to_schedule_games: type.boolean(),
  allow_teams_to_report_games: type.boolean(),
  allow_teams_to_request_locations: type.boolean(),
  allow_teams_to_join_anytime: type.boolean(),
  allow_players_to_join_anytime: type.boolean(),
  min_teams_per_session: type.number().default(2),
  max_teams_per_session: type.number().default(1000),
  min_teams_per_game: type.number().default(2),
  max_teams_per_game: type.number().default(1000),
  min_players_per_team: type.number().default(1),
  max_players_per_team: type.number().default(100),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

// Leeg.hasMany(Session, "sessions", "id", "sessionId")
// Leeg.hasOne(Group, "managers", "id", "groupId")
// Leeg.hasOne(Rating, "rating", "id", "ratingId")

/*
 *  Game workflow: teams may do action if permission is granted in the league, otherwise the league manager must do it.
 *  1. GAME REQUEST  - Team A to play Team B
 *  2. GAME APPROVE  - Team A and Team B approve requested game
 *  3. GAME SCHEDULE - Game time and location at Site A at Time t
 *  4. GAME READY    - Team A and B approve game schedule
 *  5. GAME REPORT   - Team A and B submit game results after completing game
 *
 */

// Leeg.hasAndBelongsToMany(User, "members", "email", "leegId")
// Leeg.hasAndBelongsToMany(User, "managers", "email", "leegId")

Leeg.ensureIndex('name')
Leeg.ensureIndex('title')
Leeg.ensureIndex('createdAt')

Leeg.cleanAttributes = function (attrs) {
  protectedAttributes.forEach(function (attr) { delete attrs[attr] });
  return attrs
}

module.exports = Leeg;