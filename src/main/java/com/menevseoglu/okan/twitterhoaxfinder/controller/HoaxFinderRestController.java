package com.menevseoglu.okan.twitterhoaxfinder.controller;

import com.menevseoglu.okan.twitterhoaxfinder.request.HoaxFinderSearchRequest;
import com.menevseoglu.okan.twitterhoaxfinder.service.HoaxFinderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.social.twitter.api.Tweet;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
public class HoaxFinderRestController {

    private final HoaxFinderService hoaxFinderService;

    @Autowired
    public HoaxFinderRestController(HoaxFinderService hoaxFinderService) {
        this.hoaxFinderService = hoaxFinderService;
    }

    @GetMapping("/")
    public String healthCheck() {
        return "OK";
    }

    @PostMapping("search/text")
    public List<Tweet> findWhoTweetedItByText(@Valid @RequestBody HoaxFinderSearchRequest hoaxFinderSearchRequest) {
        return hoaxFinderService.findWhoTweetedIt(hoaxFinderSearchRequest);
    }

    @PostMapping("search/text/by-member")
    public List<Tweet> findIfMemberTweetedThis(@Valid @RequestBody HoaxFinderSearchRequest hoaxFinderSearchRequest) {
        return hoaxFinderService.findIfMemberTweetedThis(hoaxFinderSearchRequest);
    }

    @PostMapping("search/image")
    public List<Tweet> findWhoTweetedItByText(@Param("image") MultipartFile image) {
        return hoaxFinderService.getTweetByImageWithTess(image);
    }
}