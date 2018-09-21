# 76Cafe
A student running coffee shop.
This web application is hosted on 76.zzhangzzheng.com with the support of AWS EC2 service.
## Steps to start EC2 service
1. run the instance on EC2.
2. ssh -i pem ec2_user@dns
3. sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
(This is to redirect 3000 port to 80)
4. In the 76Cafe directory, node app.js
## Several tips when deploy the application with AWS-EC2
1. chmod -s (change to the root mode)
2. The step to install mysql:
  * yum install mariadb_server -y
  * systemctl start mariadb.service
  * systemctl enable mariadb.service
3. mysql -u root -p (get connect to mysql)
## Further investigation
1. nginx to manage the port
2. forever npm to run app.js in daemon
