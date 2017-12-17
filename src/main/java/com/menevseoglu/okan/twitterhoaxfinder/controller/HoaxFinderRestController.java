package com.menevseoglu.okan.twitterhoaxfinder.controller;

import com.menevseoglu.okan.twitterhoaxfinder.request.HoaxFinderSearchRequest;
import com.menevseoglu.okan.twitterhoaxfinder.service.HoaxFinderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.twitter.api.Tweet;
import org.springframework.web.bind.annotation.*;
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
        return hoaxFinderService.findWhoTweetedItByText(hoaxFinderSearchRequest);
    }

    @PostMapping("search/text/by-member")
    public List<Tweet> findIfMemberTweetedThisByText(@Valid @RequestBody HoaxFinderSearchRequest hoaxFinderSearchRequest) {
        return hoaxFinderService.findIfMemberTweetedThisByText(hoaxFinderSearchRequest);
    }

    @PostMapping("search/image/{lang}")
    public List<Tweet> findWhoTweetedItByImage(@RequestBody MultipartFile image, @PathVariable String lang) {
        return hoaxFinderService.findWhoTweetedItByImage(image, lang);
    }
}