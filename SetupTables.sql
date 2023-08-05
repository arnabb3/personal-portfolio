CREATE TABLE UserData(
  playerId INT PRIMARY KEY,
  password VARCHAR(100), 
  userName VARCHAR(100),
  index_ int
);
  
CREATE TABLE GamesOwned(
 index_ INT PRIMARY KEY,
 gameName VARCHAR(100),
 played BOOL,
 hoursPlayed INT,
 playerId INT
);
  
CREATE TABLE GamesSpecificInfo(
  gameName VARCHAR(100) PRIMARY KEY,
  releasedDate date,
  supportEmail VARCHAR(100),
  supportURL VARCHAR(100),
  aboutText VARCHAR(2000),
  background VARCHAR(100),
  shortDescription VARCHAR(500),
  detailedDescription VARCHAR(2000),
  DRMNotice VARCHAR(100),
  headerImage VARCHAR(100),
  legalNotice VARCHAR(1000),
  reviews VARCHAR(1000),
  supportedLanguages VARCHAR(100),
  website VARCHAR(100)
);

CREATE TABLE PlayerData(
    gameName VARCHAR(100) PRIMARY KEY,
    metaCritic INT,
    recommendations INT,
    ownersTotal INT,
    ownersVariance INT,
    playersTotal INT,
    playersVariance INT
);

CREATE TABLE GameCategories(
  gameName VARCHAR(100) PRIMARY KEY,
  requiredAge INT,
  singlePlayer bool,
  multiPlayer bool,
  CoOp bool,
  MMO bool,
  inAppPurchases bool,
  includeSrcSDK bool,
  includeLevelEditor bool,
  VRSupport bool,
  nonGame bool,
  indie bool,
  action_ bool,
  adventure bool,
  casual bool,
  strategy BOOL,
  RPG BOOL,
  simulation BOOL,
  earlyAccess BOOL,
  freeToPlay BOOL,
  sports BOOL,
  racing BOOL,
  massivelyMultiplayer BOOL
);
  
CREATE TABLE UserLimitations(
  gameName VARCHAR(100) PRIMARY KEY,
  isFree BOOL,
  purchaseAvailable BOOL,
  subscriptionAvailable BOOL,
  priceInitial FLOAT,
  priceFinal FLOAT,
  controllerSupport BOOL,
  platformWindows BOOL,
  platformLinux BOOL,
  platformMac BOOL,
  hasMiPCReqs BOOL,
  hasRecommendedPCReqs BOOL,
  hasMinLinuxReqs BOOL,
  hasRecommendedLinuxReqs BOOL,
  hasMinMacReqs BOOL,
  hasRecommendedMacReqs BOOL,
  PCMinReqsText VARCHAR(1000),
  PCRecReqsText VARCHAR(1000),
  LinuxMinReqsText VARCHAR(1000),
  LinuxRecReqsText VARCHAR(1000),
  MacMinReqsText VARCHAR(1000),
  MacRecReqsText VARCHAR(1000)
);