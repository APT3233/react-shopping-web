## Install & Setup tomcat on Linux os

1. Install tomcat

```sh
wget https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.36/bin/apache-tomcat-10.1.36.tar.gz
```

2. Decompress file

```sh
  tar -xvzf apache-tomcat-10.1.36.tar.gz
```

3. Move folder to `/opt` and grant permissions

```sh
sudo mv apache-tomcat-10.1.36 /opt/tomcat
sudo chmod +x /opt/tomcat/bin/*.sh
```

4. Intial tomcat

```sh
/opt/tomcat/bin/startup.sh
```

5. Use servlet

```pom
<dependencies>
  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.1</version>
    <scope>provided</scope>
  </dependency>
</dependencies>
```
6. Build 
```sh
mvn clean package
cp target/my-api-app.war /opt/tomcat/webapps/
sudo systemctl restart tomcat
```


### Other config

1. Config more

- ```sh
  sudo nano /etc/systemd/system/tomcat.service
  ```
- Add content

```ini
[Unit]
Description=Apache Tomcat
After=network.target

[Service]
Type=forking
Environment=JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/opt/tomcat/bin/shutdown.sh
User=your-username
Group=your-group

[Install]
WantedBy=multi-user.target
```

- Active service

```sh
sudo systemctl daemon-reload
sudo systemctl start tomcat
sudo systemctl enable tomcat
```

- Allow Port

```sh
sudo ufw allow 8080
```

<hr/>

2. Change Port

```sh
sudo nano /opt/tomcat/conf/server.xml
```

- Replace your Port

```xml
<Connector port="<PORT>"        protocol="HTTP/1.1"
connectionTimeout="20000"
redirectPort="8443" />
```
- Restart tomcat
```sh
sudo systemctl restart tomcat
```