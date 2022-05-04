# Author
Tan Nguyen
# Description 
The project is answer for the coding test: https://github.com/Skedulo/backend-tech-test
# Setting up  
    - Install NodeJS 14 or above
    - Access project root directory
    - Run "npm install"
    - Run "build.sh" to build as JS files into /build directory (But I already did so you can skip this step)
    - Run command "run.sh [full_path_to_file]".

# The solution
1. Sort the performance list as a priority queue with these conditions as the same order: start time, priority, performance length

2. Setup a while loop that will dequeue the performance list until it empty. Each loop will check if:
    * The result list is empty: add the current performance to the result list and continue.
    * The current performance has higher priority than the last performance: add the current performance to the result list and continue and if the current one start before the last one finish, cut the last one's start time into a new performance and put it back to the performance list the sort the performance list.
    * The current performance has lower or equal priority than the last performance and finish after the last one:
        + If the current performance start after the last one finish: add the current performance to the result list and continue.
        + If the current performance start before the last one finish: set the current performance start time as the last one finish time and put it back to the performance list then sort the performance list

#3 After the while loop exits, clean up the result list to match the format of the expected result, then save it as json.
# Programming Language
* I chose Typescript on NodeJS as the main language for this project for 4 main reasons: 
    + It fits one of many language that required for the position in Skedulo, 
    + It's currently my main programming language,
    + It's quite easy to build and run on any environment,
    + Easy to control syntax and exception.
# Testing Strategy
* About unit test, I just used straight out Jest and create only one test file to test 3 main function is, input, sort and find the optimal performance.
# Feedback question
1. The timezone-specified case in the verifier has the same time zone throughout the whole file which make it not so different with the non-timezone-specified ones.
2. The verifier needs some effort to run correctly, at least for me because I ran it on a window machine.




