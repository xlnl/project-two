# Project Two: Mines Sweeper

### App Demo: Click [here!](https://xlnl.github.io/project-two/)
----------------------------------------------
TW: mention of war, bombs 

### Context: 

The Vietnam War is over but unexploded bombs and cluster munitions remain to this very day, disproportionately affecting the lives of people in areas that bear the burden of bombs decades past.

It's a public health, environmental, and economic challenge to growth in Vietnam, among other countries including Nigeria, Laos, Angola, etc. 

This project is contextualized, inspired, and informed by the amazing work that [MAG International](https://www.maginternational.org/what-we-do/where-we-work/vietnam/) does through their community liasons in areas contaminated by unexploded bombs from past conflict/wars. 

I was priviledged to see their work in motion when I was leading a research and community engagement program to Vietnam where we visited a MAG site in the central region near Da Nang City. 

Community liasons, in this capacity, play an integral role in delivering risk education and bomb awareness to the local community. They also inform the public of ways to reach MAG/the authorities when they think they might have seen or encountered a potential bomb. 

Currently, there is a tip hotline for community members to inform about a possible bomb threat. 

**Mines Sweeper**, which provides another avenue for users to create tips by way of a web application, will help expand the reach of MAG International (and subsequentially the community members at large) to mitigate and manage harm reduction in their own communities.

----------------------------------------------------------
### Wireframes

Click [here](https://whimsical.com/project-2-wireframes-4zHBvk17jQoke5LnQgJLHc) to view the wireframes of Mines Sweeper! 

### ERD 

Click [here](https://whimsical.com/project-2-erd-KhbbZiC8mwzu58YBH5sGeG) to view the entity-relationship diagram of Mines Sweeper.

### User Stories

1. As a user, I want to be able to send a tip in order to let authorities know of a possible unexploded bomb material. I want to be able to edit my tip in case I can provide additional information. 
2. As a user, I want to be able to see other tips within my county and region overall.
3. As a user, I want to be able to see a list of my tips to keep track of any possible updates. 
4. (**Stretch**) As a user, I want to be able to save tips and have it shown on a map so I can examine the density of the tips within a certain area.
5. (**Stretch**) As a user, I want to be able to comment on an existing tip to provide any feedback on it.
6. (**Stretch**) As a user, I want to upload an image of the tip through the form.

----------------------------------------------------------
### Approach

My planning process was the most extensive because I want to focus on the practicality and usability of this app. I wanted it to be simple in design and functionality as the main demographic of my users would be in the central region of Vietnam. This ensures a level of accessibility while maintaining the structural integrity of the project. 

> For example, instead of users inputting their emails, they would just need to provide their contact information. I've also set up my user models where the phone number input field can take phone numbers beyond the US. 

Additionally, I did some preliminary research from various agency-related forms to make sure I capture the most useful information. 

Beyond that, I wanted to make sure my data models were correct and had the right associations and relations. Figuring out the logic for this app and how the data tables would be set up took the next huge chunk of my time as it was critical to my app's functionality. 

I've decided to seed my province model with data of the province names in the northern central region of Vietnam. This ensures that the app is relevant and region-specific. 

Overall, I am immensely proud of how my app functions and hope to implement a maps and geocoder API for data visualizations. This project has strong potential for expansion that I plan to work on post project presentations.

----------------------------------------------------------
### Unsolved Problems

1. If given more time, I would expand the scope of this project to include other conflict zones beyond Vietnam. 

2. Maps API turned out to be a formidable challenge for me so I would definitely work further on that to have all the tips from each province render on a map at the homepage.

3. I would also simplify my routes and include more pop-up windows (for editing tips and logging in). 

----------------------------------------------------------
### Technologies Used
* Whimsicle for ERD & lo-fi wireframing
* VS Code Text Editor + Node.js + Express + Postgres + Sequelize + Bootstrap/CSS + Javascript + HTML
----------------------------------------------------------
## How to set up from starter code/boilerplate: 

1. Fork & clone this repo

2. Install dependencies
```
npm i
```

3. create a config.json with the following code: 
```
{
  "development": {
    "database": "<insert develop db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "<insert test db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "<insert production db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

```
**Note:** If your database requires a username and password, you'll need to include these as well.

4. Create database
```
sequelize db:create <insert db name here>
```
5. Migrate the `user` model to your database
```
sequelize db:migrate
```
6. Seed all the provinces
```
sequelize db:seed:all
```
7. Add `SESSION_SECRET` and `PORT` environment variables in a `.env` file (can be any string). If planning to use a maps API, make sure you put that as an environment variable as well.


