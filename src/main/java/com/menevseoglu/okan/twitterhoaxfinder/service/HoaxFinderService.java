package com.menevseoglu.okan.twitterhoaxfinder.service;

import com.menevseoglu.okan.twitterhoaxfinder.request.HoaxFinderSearchRequest;
import com.menevseoglu.okan.twitterhoaxfinder.utils.ImageUtils;
import com.menevseoglu.okan.twitterhoaxfinder.utils.TweetLanguage;
import net.sourceforge.tess4j.Tesseract1;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.twitter.api.SearchParameters;
import org.springframework.social.twitter.api.Tweet;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.logging.Level;
import java.util.logging.LogRecord;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class HoaxFinderService {

    private static final Logger LOGGER = Logger.getLogger(HoaxFinderService.class.getName());

    private static final String RETWEET_PREFIX = "RT @";

    private final Twitter twitter;

    private final ImageUtils imageUtils;

    @Autowired
    public HoaxFinderService(Twitter twitter, ImageUtils imageUtils) {
        this.twitter = twitter;
        this.imageUtils = imageUtils;
    }

    public List<Tweet> findWhoTweetedItByText(HoaxFinderSearchRequest hoaxFinderSearchRequest) {
        SearchParameters searchParameters = bindSearchRequestForSearch(hoaxFinderSearchRequest);

        List<Tweet> tweets = searchTweets(searchParameters);

        return getWhoTweetedQueryResultList(tweets)
                .stream()
                .distinct()
                .collect(Collectors.toList());
    }

    public List<Tweet> findIfMemberTweetedThisByText(HoaxFinderSearchRequest hoaxFinderSearchRequest) {
        String screenName = hoaxFinderSearchRequest.getScreenName();
        String query = hoaxFinderSearchRequest.getQuery();
        query = query.length() <= 70 ? query : query.substring(0, 70);
        List<Tweet> tweets = twitter.timelineOperations().getUserTimeline(screenName, 200);
        tweets.sort(Comparator.comparing(Tweet::getCreatedAt));
        List<Tweet> resultList = new ArrayList<>();

        for (Tweet tweet : tweets) {
            if (tweet.getText().contains(query)) {
                resultList.add(tweet);
            }
        }
        return resultList;
    }

    public List<Tweet> findWhoTweetedItByImage(MultipartFile image, String lang) {
        TweetLanguage tweetLanguage = Enum.valueOf(TweetLanguage.class, lang);
        String query = doOCRAndGetStringResult(image, tweetLanguage.getLabel());

        HoaxFinderSearchRequest hoaxFinderSearchRequest = new HoaxFinderSearchRequest();
        hoaxFinderSearchRequest.setQuery(query);
        hoaxFinderSearchRequest.setLang(lang);

        return findWhoTweetedItByText(hoaxFinderSearchRequest);
    }

    private SearchParameters bindSearchRequestForSearch(HoaxFinderSearchRequest hoaxFinderSearchRequest) {
        SearchParameters searchParameters = new SearchParameters(hoaxFinderSearchRequest.getQuery());
        searchParameters.count(100);
        TweetLanguage tweetLanguage = Enum.valueOf(TweetLanguage.class, hoaxFinderSearchRequest.getLang());
        searchParameters.lang(tweetLanguage.getLabel());
        return searchParameters;
    }

    private List<Tweet> searchTweets(SearchParameters searchParameters) {
        return twitter.searchOperations().search(searchParameters).getTweets();
    }

    private List<Tweet> getWhoTweetedQueryResultList(List<Tweet> tweets) {
        List<Tweet> resultSet = new ArrayList<>();

        if (CollectionUtils.isNotEmpty(tweets)) {
            tweets.sort(Comparator.comparing(Tweet::getCreatedAt));

            for (Tweet tweet : tweets) {

                tweet = getRetweetedTweetIfExists(tweet);

                String tweetText = tweet.getText();

                if (CollectionUtils.isEmpty(resultSet)) {
                    if (!tweetText.startsWith(RETWEET_PREFIX)) {
                        resultSet.add(tweet);
                    }
                } else {
                    for (Tweet result : resultSet) {
                        String resultText = result.getText();
                        if (!resultText.equals(tweetText)) {
                            resultSet.add(tweet);
                            break;
                        }
                    }
                }
            }
        }

        return resultSet;
    }

    private Tweet getRetweetedTweetIfExists(Tweet tweet) {
        Tweet retweetedStatus = tweet.getRetweetedStatus();

        if (Objects.nonNull(retweetedStatus)) {
            return retweetedStatus;
        }

        return tweet;
    }

    private String doOCRAndGetStringResult(MultipartFile image, String lang) {
        String result = "";

        try {
            String imageToRecognize = imageUtils.uploadImageAndGetPath(image);
            File imageFile = new File(imageToRecognize);
            BufferedImage img = ImageIO.read(imageFile);
            Tesseract1 tesseract = new Tesseract1();
            tesseract.setLanguage(lang);
            tesseract.setDatapath("src/main/resources/tessdata/");
            result = tesseract.doOCR(img);
        } catch (Exception e) {
            LOGGER.log(new LogRecord(Level.SEVERE, e.getMessage()));
        }

        return result;
    }
}