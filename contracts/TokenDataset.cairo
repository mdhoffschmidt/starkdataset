# Declare this file as a StarkNet contract.
%lang starknet

from openzeppelin.token.erc721.enumerable.presets.ERC721EnumerableMintableBurnable import constructor, mint

from starkware.cairo.common.uint256 import Uint256
from starkware.cairo.common.cairo_builtins import HashBuiltin


#
# Structs
#
struct TokenData:
    member sentence : felt
    member label : felt
end

#
# Storage
#
@storage_var
func TokenDataset(token_id : Uint256) -> (token_data : TokenData):
end


#
# Viewers
#
@view
func getTokenData{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    tokenId : Uint256
) -> (token_data : TokenData):
    let (token_data) = TokenDataset.read(tokenId)
    return (token_data)
end

#
# Minters
#
@external
func mint_with_token_data{
        pedersen_ptr: HashBuiltin*,
        syscall_ptr: felt*,
        range_check_ptr
    }(to: felt, tokenId: Uint256, sentence: felt, label: felt):

    mint(to, tokenId)

    let token_data = TokenData(sentence=sentence, label=label)
    TokenDataset.write(tokenId, token_data)

    return ()
end
