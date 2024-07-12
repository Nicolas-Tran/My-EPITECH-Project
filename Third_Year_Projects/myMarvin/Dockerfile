FROM jenkins/jenkins:lts
# Update the package manager and install any necessary dependencies
USER root  
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    # Add any necessary dependencies here
    && rm -rf /var/lib/apt/lists/*

# Switch back to the Jenkins user and set environment variables
USER jenkins
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"
ENV CASC_JENKINS_CONFIG /var/jenkins_home/my_marvin.yml

# Copy the YAML file into the Jenkins home directory
COPY my_marvin.yml /var/jenkins_home/

# Install the necessary Jenkins plugins using the jenkins-plugin-cli tool
RUN jenkins-plugin-cli --plugins \
    cloudbees-folder:latest \
    configuration-as-code:latest \
    credentials:latest \
    github:latest \
    instance-identity:latest \
    job-dsl:latest \
    script-security:latest \
    structs:latest \
    role-strategy:latest \
    ws-cleanup:latest


COPY job_dsl.groovy /var/jenkins_home/job_dsl.groovy