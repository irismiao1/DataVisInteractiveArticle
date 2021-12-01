# Exploring Socioeconomic Factors in Correlation to Hate Crimes 
### By: Darren Mok, Jaemin Lee, Iris Miao, Ellen Kahng
## Abstract

There has been a growing number of occurrences of hate crimes in recent history within the United States. To better understand how different socioeconomic factors affect hate crimes, we examined a data set provided from FiveThirtyEight that utilizes data from the Southern Poverty Law Center (SPLC) exploring the sudden influx in hate crimes that occured ten days after the presidential election in 2016, FBI data that documents hate crimes reported from 2010 through 2015, and socioeconomic factors such as median household income, share of the population that is unemployed and more. Our goal was to provide more insight into how these various factors trend in regards to each other, how hate crimes vary by state, as well as what factors within those states might be tied to hate crime rates.

For our visualization, we started by initially performing an EDA on the four variables of income inequality (Gini Index), education (share_population_with_high_school_degree), the US Presidential Voters who voted for Trump, and the average annual number of hate crimes per 100k population (as the response variable) to explore the correlation coefficients. To further compare these variables on a state level, we created a toggle-able choropleth map. The toggle allows for users to easily switch between the socioeconomic variables to render various maps with corresponding data. Additionally, there is a tooltip that will display the data regarding each socioeconomic variable per state when hovering over the visualization and a basic legend that shows the color breakdown. Our visualization makes for an easy, digestible way for even those without a lot of previous knowledge about socioeconomic variables to understand the factors at play in regards to hate crimes per state. It also allows for our users to actively explore what variables hold greater significance in certain states, and which ones have unique outliers.

We believe that with continued data collection, our visualization can bring useful insight on a state to state basis. To cause real change in minimizing hate crimes across the country, this information could be brought to local NGOs within specific states to try to  influence policy makers and legislation to address these issues and work on lowering hate crimes.

## Link to Application
https://irismiao1.github.io/DataVisInteractiveArticle/

## Link to Report
https://docs.google.com/document/d/15QsTk-GqfIaQQwcFzyt14QkcAVWd38M-AhgRLxhxFfU/edit?usp=sharing

## Link to Video

## Running Instructions for Software
Click on the link provided above. Optionally, you can download the github repo and open the file *index.html*. The application should run on your local server.

## Breakdown
We decided on utilizing the FiveThirtyEight collectively as a group. Iris and Jaemin took the lead on performing our EDA, creating the linear regression models and the pairs plot initially in R, while Darren and Iris were mainly responsible for working on creating the interactive choropleth map. Once we were finished with our visualizations, we met as a group to collectively work on the analysis and interpretation. We mainly collaborated virtually through Google Drive, Github, and Zoom meetings, as well as having a few meetings in person on campus.

