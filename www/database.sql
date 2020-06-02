drop table if exists policies;
create table policies (
  id serial,
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists announcements;
create table announcements (
  id serial,
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists content_updates;
create table content_updates (
  id serial,
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists content_urls;
create table content_urls (
  id serial,
  formats tinytext not null unique,
  name tinytext not null unique,
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists player__objects;
create table player__objects (
  id serial,
  username varchar(32) not null unique,
  rating float null default 0.00,
  star_rating float null default 0.0,
  experience_points float null default 0.00,
  experience_points_this_week float null default 0.00,
  experience_points_last_week float null default 0.00,
  presence enum(
    "OFFLINE", "ONLINE", "INGAME", "LOBBY", "IDLING", "ROAMING",
    "IN_STUDIO", "CASUAL_RACE", "RANKED_RACE", "CAREER_CHALLENGE",
    "KART_PARK_CHALLENGE", "WEB"
  ) null default "OFFLINE",
  skill_level_id enum(
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13",
    "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25",
    "26", "27", "28", "29", "30"
  ) null default 1,
  skill_level_name enum(
    "NEWCOMER_I", "NEWCOMER_II", "NEWCOMER_III", "ROOKIE_I", "ROOKIE_II",
    "ROOKIE_III", "PROSPECT_I", "PROSPECT_II", "PROSPECT_III", "PRODIGY_I",
    "PRODIGY_II", "PRODIGY_III", "PHENOM_I", "PHENOM_II", "PHENOM_III",
    "HOTSHOT_I", "HOTSHOT_II", "HOTSHOT_III", "CELEBRITY_I", "CELEBRITY_II",
    "CELEBRITY_III", "GURU_I", "GURU_II", "GURU_III", "STAR_I", "STAR_II",
    "STAR_III", "ELITE_I", "ELITE_II", "ELITE_III"
  ) null default "NEWCOMER_I",
  skill_level enum(
    "NEWCOMER_I", "NEWCOMER_II", "NEWCOMER_III", "ROOKIE_I", "ROOKIE_II",
    "ROOKIE_III", "PROSPECT_I", "PROSPECT_II", "PROSPECT_III", "PRODIGY_I",
    "PRODIGY_II", "PRODIGY_III", "PHENOM_I", "PHENOM_II", "PHENOM_III",
    "HOTSHOT_I", "HOTSHOT_II", "HOTSHOT_III", "CELEBRITY_I", "CELEBRITY_II",
    "CELEBRITY_III", "GURU_I", "GURU_II", "GURU_III", "STAR_I", "STAR_II",
    "STAR_III", "ELITE_I", "ELITE_II", "ELITE_III"
  ) null default "NEWCOMER_I",
  creator_points float null default 0.00,
  creator_points_this_week float null default 0.00,
  creator_points_last_week float null default 0.00,
  player_creation_quota tinyint(4) unsigned null default 30,
  total_player_creations int(11) unsigned null default 0,
  total_tracks int(11) unsigned null default 0,
  total_karts int(11) unsigned null default 0,
  total_characters int(11) unsigned null default 0,
  quote text null default NULL comment "bio",
  quote_readonly bit(1) null default FALSE,
  city varchar(50) null default NULL,
  state enum(
    "AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA",
    "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO",
    "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK",
    "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI",
    "WV", "WY", "XX"
  ) null default NULL,
  province varchar(50) null default NULL,
  country varchar(50) null default NULL,
  rank bigint(20) unsigned null default NULL,
  points float null default NULL,
  online_races int(11) unsigned null default NULL,
  online_wins int(11) unsigned null default NULL,
  online_finished int(11) unsigned null default NULL,
  online_forfeit int(11) unsigned null default NULL,
  online_disconnected int(11) unsigned null default NULL,
  win_streak int(11) unsigned null default NULL,
  longest_win_streak int(11) unsigned null default NULL,
  longest_drift int(11) unsigned null default NULL,
  longest_hang_time int(11) unsigned null default NULL,
  online_races_this_week int(11) unsigned null default NULL,
  online_wins_this_week int(11) unsigned null default NULL,
  online_finished_this_week int(11) unsigned null default NULL,
  online_races_last_week int(11) unsigned null default NULL,
  online_wins_last_week int(11) unsigned null default NULL,
  online_finished_last_week int(11) unsigned null default NULL,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists sessions;
create table sessions (
  id serial,
  player_id bigint(20) unsigned not null unique,
  platform enum("PS2", "PS3", "PSP", "WEB") not null,
  console_id binary(6) not null comment "fingerprint",
  hmac binary(16) not null unique comment "unknown",
  auth_token binary(20) not null unique comment "cookie",
  login_time datetime null default current_timestamp(),
  logout_cause enum(
    "NETWORK", "EXPIRED_COOKIE", "BANNED", "LOST_PING", "DELETED"
  ) not null,
  expire_cookie datetime default date_add(
    current_timestamp(), interval 8 hour
  ),
  logged_out bit(1) null default FALSE,
  banned_until datetime null default NULL,
  last_ping datetime null default current_timestamp(),
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
); 
drop table if exists preferences;
create table preferences (
  id serial,
  player_id bigint(20) unsigned not null unique,
  language_code enum(
    "EN_US", "EN_GB", "ES", "DA", "DE", "FI", "FR", "IT", "JA",
    "KO", "NL", "NO", "PL", "PT", "RU", "SV", "ZH_CN", "ZH_TW"
  ) null default NULL,
  region_code enum(
    "SCEA", "SCEE", "SCEASIA", "SCEJ"
  ) null default NULL,
  timezone smallint(6) null default NULL comment "signed smallint",
  domain varchar(320) null default NULL comment "domain → ip_address",
  ip_address int(11) unsigned null default NULL comment "ipv4 only",
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists player_profiles;
create table player_profiles (
  id serial,
  player_id bigint(20) unsigned not null unique,
  first_name varchar(30) null default "Unnamed",
  middle_name varchar(30) null default NULL,
  last_name varchar(30) null default "Player",
  addr_line1 varchar(50) null default NULL,
  addr_line2 varchar(50) null default NULL,
  addr_line3 varchar(50) null default NULL,
  city varchar(50) null default NULL,
  state enum(
    "AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA",
    "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO",
    "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK",
    "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI",
    "WV", "WY", "XX"
  ) null default NULL,
  postal_code varchar(10) null default NULL,
  province varchar(50) null default NULL,
  country varchar(50) null default NULL,
  birthdate datetime null default NULL,
  email varchar(200) null default NULL,
  cell_phone varchar(20) null default NULL,
  quote text null default NULL comment "bio",
  quote_readonly bit(1) null default FALSE,
  im_yahoo varchar(33) null default NULL,
  im_aol varchar(16) null default NULL,
  im_msn varchar(200) null default NULL,
  im_icq varchar(200) null default NULL,
  team_id bigint(20) unsigned null default NULL,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists player_avatars;
create table player_avatars (
  id serial,
  player_id bigint(20) unsigned not null unique,
  avatar_readonly bit(1) null default FALSE,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists player_favorites;
create table player_favorites (
  id serial,
  player_id bigint(20) unsigned not null,
  favoritize_player_id bigint(20) unsigned not null,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists player_analytics;
create table player_analytics (
  id serial,
  player_id bigint(20) unsigned not null unique,
  career_race int(11) unsigned null default 0,
  time_trial_race int(11) unsigned null default 0,
  hotseat_race int(11) unsigned null default 0,
  action_race int(11) unsigned null default 0,
  pure_race int(11) unsigned null default 0,
  ai_on_race int(11) unsigned null default 0,
  ai_off_race int(11) unsigned null default 0,
  split_screen_race int(11) unsigned null default 0,
  ranked_race int(11) unsigned null default 0,
  friends_only_race int(11) unsigned null default 0,
  private_race int(11) unsigned null default 0,
  public_race int(11) unsigned null default 0,
  hosted_casual_race int(11) unsigned null default 0,
  ranked_series int(11) unsigned null default 0,
  hotseat_players int(11) unsigned null default 0,
  casual_race int(11) unsigned null default 0,
  casual_race_laps int(11) unsigned null default 0,
  char_downloads int(11) unsigned null default 0,
  kart_downloads int(11) unsigned null default 0,
  track_downloads int(11) unsigned null default 0,
  char_uploads int(11) unsigned null default 0,
  kart_uploads int(11) unsigned null default 0,
  track_uploads int(11) unsigned null default 0,
  player_complaints int(11) unsigned null default 0,
  creation_complaints int(11) unsigned null default 0,
  photos_taken int(11) unsigned null default 0,
  thumbnail_render_failures int(11) unsigned null default 0,
  download_timeouts int(11) unsigned null default 0,
  webservice_timeouts int(11) unsigned null default 0,
  player_connect_errors int(11) unsigned null default 0,
  coi_0_enter int(11) unsigned null default 0,
  coi_1_enter int(11) unsigned null default 0,
  coi_2_enter int(11) unsigned null default 0,
  coi_3_enter int(11) unsigned null default 0,
  coi_4_enter int(11) unsigned null default 0,
  coi_5_enter int(11) unsigned null default 0,
  coi_6_enter int(11) unsigned null default 0,
  session_time int(11) unsigned null default 0,
  char_studio_time int(11) unsigned null default 0,
  kart_studio_time int(11) unsigned null default 0,
  track_studio_time int(11) unsigned null default 0,
  modspot_time int(11) unsigned null default 0,
  challenges_issued int(11) unsigned null default 0,
  challenges_accepted int(11) unsigned null default 0,
  game_invites_issued int(11) unsigned null default 0,
  game_invites_accepted int(11) unsigned null default 0,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists player_glickos;
create table player_glickos (
  id serial,
  player_id bigint(20) unsigned not null unique,
  num_games int(11) unsigned null default 0,
  points float null default 150000,
  volatility float null default 0600,
  deviation float null default 35000,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists player_creations;
create table player_creations (
  id serial,
  player_id bigint(20) unsigned not null,
  original_player_id bigint(20) unsigned not null,
  original_player_username varchar(32) not null,
  parent_player_id bigint(20) unsigned null default NULL,
  parent_player_username varchar(32) null default NULL,
  parent_creation_id bigint(20) unsigned null default NULL,
  parent_creation_name tinytext null default NULL,
  moderation_status enum(
    "PENDING", "NEW", "ACTIVE", "APPROVED", "REPORTED", "BANNED"
  ) null default "PENDING",
  moderation_status_id enum(
    "1200", "1201", "1202", "1203", "1204", "1205"
  ) null default "1200",
  player_creation_type enum(
    "CHARACTER", "KART", "PHOTO", "TRACK"
  ) not null,
  platform enum("PS2", "PS3", "PSP", "WEB") not null,
  username varchar(32) not null,
  name tinytext not null,
  description text null default NULL,
  tags text null default NULL,
  rating float null default 0.00,
  star_rating float null default 0.0,
  rank bigint(20) unsigned null default NULL,
  votes int(11) unsigned null default 0,
  dlc_keys text null default NULL,
  preview_md5 binary(16) not null,
  preview_size int(11) unsigned not null,
  data_md5 binary(16) not null,
  data_size int(11) unsigned not null,
  version int(11) unsigned null default 1,
  is_remixable bit(1) null default TRUE,
  track_theme int(11) unsigned null default NULL,
  ai bit(1) null default TRUE,
  auto_reset bit(1) null default TRUE,
  best_lap_time float null default 0.00,
  longest_drift float null default 0.00,
  longest_hang_time float null default 0.00,
  views int(11) unsigned null default 0,
  views_last_week int(11) unsigned null default 0,
  views_this_week int(11) unsigned null default 0,
  downloads int(11) unsigned null default 0,
  downloads_last_week int(11) unsigned null default 0,
  downloads_this_week int(11) unsigned null default 0,
  points float null default 0.00,
  points_today float null default 0.00,
  points_yesterday float null default 0.00,
  points_this_week float null default 0.00,
  points_last_week float null default 0.00,
  races_started int(11) unsigned null default 0,
  races_won int(11) unsigned null default 0,
  races_finished int(11) unsigned null default 0,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists creations_ratings;
create table creations_ratings (
  id serial,
  player_id bigint(20) unsigned not null,
  creation_id bigint(20) unsigned not null,
  rating enum("1", "2", "3", "4", "5") null default NULL,
  comments text null default NULL,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists game__objects;
create table game__objects (
  id serial,
  game_type enum(
    "CHARACTER_CREATORS", "KART_CREATORS", "ONLINE_ACTION_RACE",
    "ONLINE_HOT_SEAT_RACE", "ONLINE_LKS_RACE", "ONLINE_PURE_RACE",
    "ONLINE_TIME_TRIAL_RACE", "OVERALL", "OVERALL_CREATORS",
    "OVERALL_RACE", "TRACK_CREATORS"
  ) null default "OVERALL",
  game_state enum(
    "ACTIVE", "CANCELLED", "CONCEDE", "CONCEDE_ON", "DISCONNECTED",
    "DISCONNECTED_ON", "DIVERGENCE", "FINISHED", "FORFEIT", "FORFEIT_ON",
    "FRIENDLY_QUIT", "FRIENDLY_QUIT_ON", "PENDING", "PROCESSED",
    "QUIT", "QUIT_ON"
  ) null default "FINISHED",
  host_player_id bigint(20) unsigned not null,
  platform enum("PS2", "PS3", "PSP", "WEB") not null,
  name tinytext null default NULL,
  is_ranked bit(1) null default TRUE,
  speed_class tinytext null default NULL,
  track int(11) unsigned null default NULL,
  track_group tinytext null default NULL,
  privacy tinytext null default NULL,
  number_laps int(11) unsigned null default NULL,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists game_players;
create table game_players (
  id serial,
  game_id bigint(20) unsigned not null,
  player_id bigint(20) unsigned not null,
  team_id int(11) unsigned null default NULL,
  game_state enum(
    "ACTIVE", "CANCELLED", "CONCEDE", "CONCEDE_ON", "DISCONNECTED",
    "DISCONNECTED_ON", "DIVERGENCE", "FINISHED", "FORFEIT", "FORFEIT_ON",
    "FRIENDLY_QUIT", "FRIENDLY_QUIT_ON", "PENDING", "PROCESSED",
    "QUIT", "QUIT_ON"
  ) null default "FINISHED",
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists game_players_stats;
create table game_players_stats (
  id serial,
  game_player_id bigint(20) unsigned not null,
  game_id bigint(20) unsigned not null,
  player_id bigint(20) unsigned not null,
  is_complete bit(1) null default TRUE, 
  track_idx int(11) unsigned not null,
  kart_idx int(11) unsigned not null,
  character_idx int(11) unsigned not null,
  music_idx int(11) unsigned null default NULL,
  ghost_car_data_md5 binary(16) not null,
  bank tinyint(4) unsigned null default NULL,
  points float null default NULL,
  volatility float null default NULL,
  deviation float null default NULL,
  best_lap_time float not null,
  finish_time float null default NULL,
  finish_place tinyint(4) unsigned null default NULL,
  is_winner tinyint(4) unsigned null default NULL,
  longest_drift float null default NULL,
  longest_hang_time float null default NULL,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists achievements;
create table achievements (
  id serial,
  player_id bigint(20) unsigned not null,
  achievement_type_id int(11) unsigned not null,
  player_creation_id bigint(20) unsigned not null,
  player_creation_name varchar(32) not null unique,
  has_read bit(1) null default FALSE,
  relevant bit(1) null default FALSE,
  progess_value int(11) unsigned not null,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists mail_messages;
create table mail_messages (
  id serial,
  sender_id bigint(20) unsigned not null,
  sender_name varchar(32) not null,
  recipient_list tinytext not null,
  mail_message_type enum("GAME", "WEBSITE", "ALERT") not null,
  has_read bit(1) null default FALSE,
  has_forwarded bit(1) null default FALSE,
  has_replied bit(1) null default FALSE,
  has_deleted bit(1) null default FALSE,
  read_at datetime null default NULL,
  forwarded_at datetime null default NULL,
  replied_at datetime null default NULL,
  recipient_id bigint(20) unsigned null default NULL,
  attachment_reference binary(16) null default NULL,
  subject tinytext not null,
  body text null default NULL,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists grief_reports;
create table grief_reports (
  id serial,
  player_id bigint(20) unsigned not null,
  target_type enum("PROFILE", "CREATION") not null,
  target_id bigint(20) unsigned not null,
  reason enum(
    "OTHER", "COPYRIGHT", "HARASS", "ILLEGAL", "MATURE",
    "OFFENSIVE", "RACIAL", "SEXUAL", "TOS", "VIOLENCE", "VULGAR" 
  ) not null,
  comments text null default NULL,
  status enum(
    "RECEIVED", "OPENED", "UNOPENED", "REOPENED", "PENDING",
    "COMPLAINT_VALID", "COMPLAINT_INVALID", "INCONCLUSIVE"
  ) null default "RECEIVED",
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists profanity_filters;
create table profanity_filters (
  id serial,
  pattern_regex text not null unique,
  replace_text text null default NULL,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists tags;
create table tags (
  id serial,
  lang char(2) not null,
  tag tinytext not null,
  type enum("CHARACTER", "KART", "TRACK") not null,
  category char(4) not null,
  name tinytext not null,
  deleted_record datetime null default NULL comment "soft",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists server__objects;
create table server__objects (
  id serial,
  player_id bigint(20) unsigned not null unique,
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists server_tickets;
create table server_tickets (
  id serial,
  server_id bigint(20) unsigned not null unique,
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
drop table if exists beta_whitelist;
create table beta_whitelist (
  id serial,
  username varchar(32) not null unique,
  ip_address int(11) unsigned not null unique comment "ipv4 only",
  created_at datetime null default current_timestamp(),
  updated_at datetime null default current_timestamp()
    on update current_timestamp(),
  primary key(id)
);
