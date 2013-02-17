/* Data Arrays for Well-Being Index & Social Happiness
 * Sources:
 * 	http://www.well-beingindex.com
 *  		Years: 2009-2012
 * 	http://www.gallup.com/poll/151457/Seniors-Maintain-Happiness-Highs-Less-Social-Time.aspx
 *	RAW DATA- Available at: https://docs.google.com/spreadsheet/ccc?key=0AjlhX9G3xLQ6dDZ4US1sUUNEUzhvTXlaSGNOMWNybEE
 * */
/* Gender Happiness Data
 * 0 -> Male
 * 1 -> Female
 * 2 -> Average
 */
var GENDER_GROUP = ["Male", "Female"];
var GENDER_DATA = [66.45, 66.21, 66.33];

/* Age Happiness Data
 * 0 -> 18-29
 * 1 -> 30-44
 * 2 -> 45-64
 * 3 -> 65+
 * 4 -> Average
 */
var AGE_GROUP = ["18-29", "30-44", "45-64", "65+"];
var AGE_DATA = [67.39, 66.68, 65.06, 68.33, 66.86];

/* Family Status Happiness Data
 * 0 -> Married
 * 1 -> Single
 * 2 -> Divorced
 * 3 -> Partner
 * 4 -> Average
 */
var FAMILY_GROUP = ["Married", "Single", "Divorced", "Dating"];
var FAMILY_GROUP_DATA = [68.99, 64.94, 60.11, 63.34, 64.35];

/* Ethnicity Data
 * 0 -> White
 * 1 -> Black
 * 2 -> Hispanic
 * 3 -> Asian
 * 4 -> Other
 * 5 -> Average
 */
var ETHNICITY_GROUP = ["White", "Black", "Hispanic", "Asian", "Other"];
var ETHNICITY_DATA = [67.31, 64.09, 65.32, 69.80, 62.92, 65.88];

/* Household Income Data
 * 0 -> $0-$3,999
 * 1 -> $4,000-$7,499
 * 2 -> $7,500-$9,999
 * 3 -> $10,000+
 * 4 -> Average
 */
var INCOME_GROUP = ["$0-$3,999", "$4,000-$7,499", "$7,500-$9,999", "$10,000+"];
//var INCOME_GROUP = ["$0-$47,999", "$48,000-$89,999", "$90,000-$119,999", "$120,000+"];
var INCOME_DATA = [60.11, 69.47, 73.26, 74.90, 69.43];

/* Social Time Happiness Data
 * 0 -> 0-2 hours
 * 1 -> 3-5 hours
 * 2 -> 6-8 hours
 * 3 -> 9+ hours
 * 4 -> Average
 */
var SOCIAL_TIME_GROUP = ["0-2", "3-5", "6-8", "9+"];
var SOCIAL_TIME_DATA = [34.67, 47.00, 55.00, 56.00, 48.17];

/* Education Happiness Data
 * 0 -> None
 * 1 -> High School
 * 2 -> College
 * 3 -> Graduate School
 */
var EDUCATION_GROUP = ["None", "High School", "College", "Graduate School"];
var EDUCATION_DATA = [34.67, 47.00, 55.00, 56.00];

/* Well Being Tips
 *	http://www.lifehack.org/articles/lifehack/9-tips-in-life-that-lead-to-happiness.html
 *	http://zenhabits.net/handbook-for-life-52-tips-for-happiness-and-productivity/
 * 
 *  Array for Tips data
 */
var TIPS_DATA = [
		 "<b>Understand what it is that will make you happy.</b> Everyone has unique requirements for attaining happiness and what makes one person happy may be very different from what makes someone else happy. Revel in your individuality and do not worry about whether or not your desires are comparable to those of your peers."
		,"<b>Surround yourself with happy people.</b> It is easy to begin to think negatively when you are surrounded by people who think that way. Conversely, if you are around people who are happy their emotional state will be infectious."
		,"<b>Take some time each day to do something nice for yourself.</b> Whether you treat yourself to lunch, take a long, relaxing bath or simply spend a few extra minutes on your appearance you will be subconsciously putting yourself in a better mood."
		,"<b>Maintain your health.</b> Being overweight or not eating nutritious foods can have a negative effect on your mood. Additionally, exercise has been known to release endorphins that give you a feeling of happiness."
		,"<b>Spend time with family and loved ones.</b> One of the things that can lead to the greatest happiness, make this a priority every week, every day. Clear off as much time as possible to spend with those you love, and truly enjoy those times. Be present as you do it — don’t think about work or your blog or what you need to do."
		,"<b>Help others.</b> While finding pleasure in life is one way to be happy, doing something that is more than you, that helps others to be happy or to suffer less, is even more rewarding.<br><br> Find a good cause or two and volunteer some of your time. You don’t have to commit to big chunks of your life, but just volunteer for a couple of hours. If you do this, you will find out how tremendously happy this will make you. You might even become addicted."
		,"<b>Focus on benefits, not difficulties.</b> If you find yourself struggling to do something, or procrastinating, stop thinking about how hard something is, or why you don’t want to do it. Focus instead on what benefits it will have for you, what opportunities it will create — the good things about it.<br><br>By changing the way you see things, you can change how you feel about them and make it easier to get things done."
		,"<b>Eliminate debt.</b> Financially, this is a huge way to relieve stress and make you feel much more secure. Get rid of your credit cards (if you have a problem with credit card debt or impulse spending) and create a snowball plan for yourself. It may take a couple of years, but you can get out of debt."
		,"<b>Review goals.</b> Setting goals is important, but the key to making them a reality is actually reviewing them (at least monthly, but weekly is better) and taking action steps to make them come true. Again, focus on one at a time, and really focus on them."
		,"<b>Don’t compare yourself to others.</b> This is hard to do, but it can be a great way to accept who you are and what you have. Whenever you find yourself comparing yourself to a co-worker, a friend, or someone famous (those models on magazines with amazing abs), stop. And realize that you are different, with different strengths.<br><br>Take a minute to appreciate all the good things about yourself, and to be grateful for all the blessings in your life."
		,"<b>Get into the flow.</b> There is a state of doing known as Flow, which is when you completely lose yourself in a task and forget about the world around you. It leads to happiness, and productivity. Set yourself up for it by clearing distractions, giving yourself a challenging (but accomplishable) task, and making it something that you like doing. Then try to lose yourself in that task."
		,"<b>Celebrate.</b> When you do something right, when you accomplish something, when you feel like it, reward yourself. Celebrate. Have fun, and pat yourself on the back."
		,"<b>Exercise.</b> Just a short walk or run could lift your spirits and reduce stress. Nothing difficult. Just get outside and move."
		,"<b>Jealousy doesn't help.</b> Many people obsess about others who are successful or happy. That gets you nowhere, fast. Instead, be happy for them. Then focus on yourself, and what you do right."
		,"<b>Learn something new.</b> It's strange how many of us are afraid to try new things, or admit we don't know something. But learning new skills or new information is one of the most fun things there is to do. Give it a try."
		,"<b>Stop watching and reading news.</b> Sure, this sounds like a head-in-the-sand suggestion. But really, if you give this a try, you won't miss a thing. And instead, you can focus on reading books and listening to music that lifts you up."
		,"<b>Follow your passions.</b> If you do what you love to do, especially for a living, you will be extremely happy. This is one of the best things you can do. If it seems impossible, don't give up. Others have done it and you can too."
	];