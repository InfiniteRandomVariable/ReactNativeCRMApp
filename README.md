# ReactNativeCRMApp

Purpose of the App: Helped retailers/vendors/marketers to form alliance and made intelligent group decision and increased collective group purchasing power by analyzing business performance, best selling products and identified trend, featuring accounting POS, access control and inventory management. 



Architecture logics:
Why React Native?
To support all the retailers/vendors, the app must be as generic as possible. ReactNative offers the most support for scalability and easier unit testing as oppose to AngularJS and is under rapid development. 

Why AWS serverless framework?
Compatible to AWS DynamoDB (NoSQL) and AWS Serverless framework.
The NOSQL data structure supports fast analysis of data without SQL joints with minimal requests, faster throughput for networking. 
It is cheap and industry ready, inspire of its poor documentation and many products are not fully nature. 
AWS is the leader of SERVERLESS framework. It is easy to use Docker to test the system. Minimize the cost of maintaining backend. 
It is extremely scalable without dedecated server.


Why is this app performant?
This code supports login/signup while decouples the dependence on Facebook for user authentication processes.

Will use native environment React Hooks for its cache data instead of Redux. Less files and less external plugins, the better. 
Demonstrate the layout and the structure of the app. 
Use Flow to make each variable and function to have strong type. 
Various tools are used to ensure code correctness such as ELint and etc.
 

The style of the app is component based. We only use minimal external library. No React Native Expo, no react native elements, to ensure flexibility and performance. NativeBase is used for its strong support for sidebar navigation and faster performance.


To see the ready-to-show code examples, go to:

ReactNativeCRMApp/src/screens/sale/ReportSales

ReactNativeCRMApp/src/screens/sale/AddItem

ReactNativeCRMApp/src/screens/sale/AddInventory

ReactNativeCRMApp/src/screens/sale/reviewItems

ReactNativeCRMApp/src/screens/inventory/createItem

ReactNativeCRMApp/src/screens/saleAndInventory

The published documents/code are by no mean complete or reflect the latest development of this app.

Utilized: React Native, AWS Serverless Stacks such as DynamoDB, Lambda.

