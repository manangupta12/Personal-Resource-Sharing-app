# Personal-Storage-over-Web
This Node.js WebApp allows you to create your personal storage over the Internet.
It allows you to store, update, delete and view your personal resources and also offers a sharing facility which allows you to share the file in the form of a URL.
There is a facility of genrating a One-Time Sharing link as well.

We mostly use Google Drive for storing and sharing the resources.
Even in case of sharing temporary files,it requires us to login into the Google account, Upload the resource to Google Drive and obtain the public sharing link for that file. It surely is a tedious job and eventually the Google Drive gets cluttered very soon with temporary files and it ends up filling up the free 15Gb of cloud storage.

Also,it requires the other person to have a Google account. 
And, in order to access the shared file, he/she is required to first login into the Google account.

Whereas, this app provides us the facility to share small size resources at the very fast speed.

Currently, It uses MongoDb online database service - ATLAS, which provides a storage of 512 MB for free. You can also increase the storage by upgrading the MongoDb cluster.

We can also leverage AWS DynamoDB, which provides a free lifetime storage of 25 Gb on AWS cloud. It's a Fast and flexible NoSQL database with seamless scalability and has the capability to handle up to 200M requests per month.

Private Sharing - 

In case of private sharing, the other personal will have access to the resource for lifetime 
which provides a storage of around 15 Gbs and it gets cluttered up very soon with unnecessary temporary files that we would have uploadd in order to get be able 
Most of the time, we face difficulties in sharing a file with multiple friends. We tend to prefer Google Drive for 
