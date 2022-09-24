// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract QuadraticVotingERC721 {

    uint proposalCount;
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    enum ProposalStatus {
        IN_PROGRESS,
        ENDED
    }

    struct Proposal {
        address proposalForNFT;
        address creator;
        bytes description;
        uint yesVotes;
        uint noVotes;
        uint expirationTime;
        ProposalStatus status;
        address[] voters;
        mapping(address => Voter) voterInfo;
    }

    struct Voter {
        bool hasVoted;
        bool vote;
        uint weight;
    }

    mapping(uint => Proposal) public ProposalIdToProposal;


    modifier hasBalance(address _nftAddress, uint _tokens){
        require(_nftAddress != address(0));
        IERC721 erc721 = IERC721(_nftAddress);
        uint voterBalance = erc721.balanceOf(msg.sender);
        require(voterBalance >= _tokens, "You dont have enough tokens to support your weight");
        _;
    }

    modifier validProposal(uint _proposalId){
        require(_proposalId <= proposalCount && _proposalId > 0);
        require(getProposalStatus(_proposalId) == ProposalStatus.IN_PROGRESS);
        require(getProposalExpirationTime(_proposalId) > block.timestamp, "Proposal has expired");
        _;
    }

    modifier authUser(address _user, uint _proposalId) {
        require(msg.sender == owner || msg.sender == ProposalIdToProposal[_proposalId].creator);
        _;
    }

    function createProposal(address _nftAddress,bytes calldata _description, uint _expirationTime) external returns (uint) {
        require(_expirationTime > block.timestamp, "Expiration time must be in future" );
        Proposal storage currentProposal = ProposalIdToProposal[proposalCount++];
        currentProposal.proposalForNFT = _nftAddress;
        currentProposal.creator = msg.sender;
        currentProposal.description = _description;
        currentProposal.expirationTime = _expirationTime;
        currentProposal.status = ProposalStatus.IN_PROGRESS;
        return proposalCount;
    }
    function castVote(uint _proposalId, address _nftAddress, uint _tokens, bool _vote) 
    public 
    hasBalance(_nftAddress, _tokens)
    validProposal(_proposalId)
    {
        require(ProposalIdToProposal[_proposalId].proposalForNFT == _nftAddress);
        require(userHasVoted(_proposalId, msg.sender) != true, "User has already voted");
        Proposal storage currentProposal = ProposalIdToProposal[_proposalId];
        uint weight = sqrt(_tokens);
        currentProposal.voterInfo[msg.sender] = Voter(true, _vote, weight);
        currentProposal.voters.push(msg.sender);
    }

    function countVotes(uint _proposalId) external
    validProposal(_proposalId)
    returns (uint, uint)
    {
        uint yesVotes;
        uint noVotes;
        address[] memory voters = ProposalIdToProposal[_proposalId].voters;
        for (uint i = 0; i < voters.length; i++) {
            address voter = voters[i];
            bool vote = ProposalIdToProposal[_proposalId].voterInfo[voter].vote;
            uint weight = ProposalIdToProposal[_proposalId].voterInfo[voter].weight;
            if (vote == true) {
                yesVotes += weight;
            } 
            else {noVotes += weight;}
        } 
        
        ProposalIdToProposal[_proposalId].yesVotes = yesVotes;
        ProposalIdToProposal[_proposalId].noVotes = noVotes;
        return (yesVotes, noVotes);
    }

    function setProposalStatus(uint _proposalId) external 
    validProposal(_proposalId) 
    authUser(msg.sender, _proposalId)  
    {
        require(msg.sender == owner || msg.sender == ProposalIdToProposal[_proposalId].creator);
        ProposalIdToProposal[_proposalId].status = ProposalStatus.ENDED;
    }

    function userHasVoted(uint _proposalId, address _user)internal view returns (bool) {
        return (ProposalIdToProposal[_proposalId].voterInfo[_user].hasVoted);
    }

    function getProposalStatus(uint _proposalId) internal view returns(ProposalStatus) {
       return ProposalIdToProposal[_proposalId].status;
    }

    function getProposalExpirationTime(uint _proposalId) internal view returns(uint) {
        return ProposalIdToProposal[_proposalId].expirationTime;
    }

    function sqrt(uint x) internal pure returns (uint y) {
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }



}