CREATE TABLE "recommendations" (
  "id" SERIAL PRIMARY KEY,
  "score" INTEGER NOT NULL,
  "youtubeLink" VARCHAR(355) NOT NULL,
  "name" VARCHAR(355) NOT NULL
);
