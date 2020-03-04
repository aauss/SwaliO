# SwaliO
Garbage separating made easy (through force and capitalism, muhahaha). Made during the HackHPI 2019

# Functionality
We wanted to tackle the problem with trash separation. Did you know that when colored glass is thrown in a bin for white glass, this batch is not usable for white glass anymore? We assume a smart bin setup that has a camera placed at the opening. We used PySOT which uses SiamRPN and SiamMask to track the glass bottle that is thrown into the bin. PySOT was a greate option for the hackathon since we could train it with one-short learning to detect bottles. The tracked object is then classified using a k-nearest neighbor classifier to detect the color of the bottle. We used this classifier during the hackathon since it was the fastest and easiest classifier to train for demonstration.

To give an incentive for people to separate glass bottles correctly, we implemented a block chain for the smart bin that pays you back when you separate correctly. Recycling companies save actual money if they have better separated trash, money that can be payed back to the people that are helping to separate.

## Note
The model in ```pysot/tools/saved_models/``` is zipped and needs to be unzipped
